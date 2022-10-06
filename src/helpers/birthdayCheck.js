export const isBirthdayToday = (birthday) => {
    const today = new Date();
    const todayDay = today.getDate()
    const todayMonth = today.getMonth()

    const birthDate = new Date(birthday);
    const birthDay = birthDate.getDate()
    const birthMonth = birthDate.getMonth()

    return todayDay === birthDay && todayMonth === birthMonth
}