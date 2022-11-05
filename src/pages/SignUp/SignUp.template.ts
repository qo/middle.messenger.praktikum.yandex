export default `
.signup_wrapper
    form.signup(id='form' novalidate)
        h1.signup__title
            p(component='titleText')
        .signup__fields
            div(component='emailField')
            div(component='loginField')
            div(component='firstNameField')
            div(component='lastNameField')
            div(component='phoneNumberField')
            div(component='passwordField')
            div(component='passwordConfirmField')
        .signup__submit
            button(component='submitButton' type='submit' form='form')
        .signup__signup_link
            a(component='signinLink')
`;