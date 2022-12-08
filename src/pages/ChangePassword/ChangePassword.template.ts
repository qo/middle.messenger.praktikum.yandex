export default `
.change_password__wrapper
    div(component='goBack')
    form.change_password(id='password_form')
        .change_password
            .profile__pfp
            h1.profile__title
                p(component='profileTitle')
            .change_password__data
                div(component='oldPassword')
                div(component='newPassword')
                div(component='newPasswordConfirm')
            .change_password__button
                button(component='submitButton' type='submit' form='password_form')
`;