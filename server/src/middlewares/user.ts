export async function isPasswordComplex(password: string) {
    const minLength = 8;
    let uppercaseCount = 0;
    let numericCount = 0;
    let specialCharCount = 0;

    for (let char of password) {
        if (/[A-Z]/.test(char)) {
            uppercaseCount++;
        } else if (/[0-9]/.test(char)) {
            numericCount++;
        } else if (/[^A-Za-z0-9]/.test(char)) {
            specialCharCount++;
        }
    }

    return (
        password.length >= minLength &&
        uppercaseCount > 0 &&
        numericCount > 0 &&
        specialCharCount > 0
    );
}
