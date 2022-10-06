const cors = require('cors')({origin: true});
const functions = require("firebase-functions");

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

const validate = require('validate-vat');

initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.registerNewCustomer = functions.https.onCall(async(data, context) => {
  //functions.logger.info(data.text);
  //console.log(data);

  const displayName = data?.displayName
  const email = data?.email
  const password = data?.password
  const anonUserId = data?.userUID

  let usr
  const auth = getAuth()
  try {
    await auth.deleteUser(anonUserId)
    usr = await auth.createUser({
      email,
      emailVerified: false,
      //phoneNumber,
      password,
      displayName,
      //photoURL,
      disabled: false,
    })
    functions.logger.info('new user', usr.uid, usr.displayName);
  } catch (err) {
    return {
      error: {
        code: err.errorInfo.code,
        message: err.errorInfo.message
      }
    }
  }

  const fsdb = getFirestore()
  const doc = await fsdb.collection('systemUsers').add(
    // {
    //   companyName: 'N/A',
    //   email,
    //   displayName,
    // }
    data
  )

  await auth.setCustomUserClaims(usr.uid, {
    owner: true,
    admin: true,
    tenantId: doc.id,
  })

  const docUsr = await fsdb.collection(`systemUsers/${doc.id}/users`).add(
    {
      email,
      emailVerified: false,
      //phoneNumber,
      displayName,
      //photoURL,
      disabled: false,
      customClaims: {
        owner: true,
        admin: true,
        tenantId: doc.id,
      }
    }
  )

  return {
    user: usr,
    tenantId: doc.id
  }
});



exports.validateVAT = functions.https.onCall((data, context) => {
  // https://github.com/viruschidai/validate-vat
  // EU_COUNTRIES_CODES = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'EL', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'XI']
  //const validate = require('validate-vat');
  const prom = new Promise((resolve, reject) => {
    validate( data.countryCode,  data.vatNumber, (err, validationInfo) => {
          if (err) reject(err)
          resolve(validationInfo)
      })
  })
  return prom
})

/*
Rekurzivno brianje z firebase tools ki zbriše tudi orphaned zapise
https://firebase.google.com/docs/firestore/solutions/delete-collections

*/


