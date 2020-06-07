export const firstLetterToLower = str => {
    return str ? str.charAt(0).toLowerCase() + str.slice(1) : null;
}

export const firstLetterToUpper = str => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
}

export const format = (str, ...args) => {
    for (const [i, val] of Object.entries(args)) {
        str = str.replace(`{${i}}`, val);
    }
    return str
}