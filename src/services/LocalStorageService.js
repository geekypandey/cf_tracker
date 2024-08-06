const USER_REF = 'cf-users'
const EMPTY_LIST = [];

const _parseUsingOldMethod = (input) => {
    const usernames = input.trim()
        .split(';')
        .map(username => username.trim())
        .filter(username => username.length);

    // return only unique usernames
    return [...new Set(usernames)];
}

const _parseUsingNewMethod = (input) => {
    return JSON.parse(input);
}

const getSavedUsernames = () => {
    if (!localStorage.getItem(USER_REF)) return EMPTY_LIST;

    /* The previous implementation stored the value as string for saving
    we have to support old method as well */
    try {
        const usernames = _parseUsingNewMethod(localStorage.getItem(USER_REF));
        return usernames;
    } catch(error) {
        return _parseUsingOldMethod(localStorage.getItem(USER_REF));
    }
}


export { getSavedUsernames };
