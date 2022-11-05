export default `
.signin_wrapper
    form.signin
        h1.signin__title
            p(component='titleText')
        .signin__fields
            div(component='loginField')
            div(component='passwordField')
        .signin__submit
            button(component='submitButton' type='submit' form='form')
        .signin__signup_link
            a(component='signUpLink')
`;