module.exports.validationReg = (username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must be filled'
    }
    if (email.trim() === '') {
        errors.email = "Email can't be empty"
    }
    if (password.trim() === '') {
        errors.password = "Password required"
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLogin = (username, password) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must be filled'
    }
    if (password.trim() === '') {
        errors.password = 'Password required'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}

