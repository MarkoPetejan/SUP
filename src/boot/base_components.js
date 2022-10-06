
import ListTemplate from "src/components/ListTemplate.vue";
import DBText from "src/components/base/DBText.vue";
import DBLookup from "src/components/base/DBLookup.vue";
import DBDate from "src/components/base/DBDate.vue";
import DBOptionPicker from "src/components/base/DBOptionPicker.vue";
import DBTags from "src/components/base/DBTags.vue";
import DBChipCombo from "src/components/base/DBChipCombo/index.vue";
import DBCheckBox from "src/components/base/DBCheckBox.vue";

import DBFieldType from "src/components/base/DBFieldType.vue";
import DBWidgetType from "src/components/base/DBWidgetType.vue";

import DBAvatar from "src/components/base/DBAvatar.vue";

export default ({ app }) => {
  // const importList = import.meta.glob('../components/base/*.vue')

  // const startIndex = '../components/base/'.length
  // Object.keys(importList).map(key => {
  //   const componentName = key.substring(startIndex, key.length - 4)
  //   const componentConfig = importList[key]
  //   console.log('NE DELA', componentName, componentConfig.default || componentConfig)
  //   app.component(componentName, componentConfig.default || componentConfig);
  // })

  app.component("ListTemplate", ListTemplate);

  app.component("DBText", DBText);
  app.component("DBLookup", DBLookup);
  app.component("DBDate", DBDate);
  app.component("DBOptionPicker", DBOptionPicker);
  app.component("DBTags", DBTags); // deprecated
  app.component("DBChipCombo", DBChipCombo);
  app.component("DBCheckBox", DBCheckBox);


  app.component("DBFieldType", DBFieldType);
  app.component("DBWidgetType", DBWidgetType);

  app.component("DBAvatar", DBAvatar);
}
