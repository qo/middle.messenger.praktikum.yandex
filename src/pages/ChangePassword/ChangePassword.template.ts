export default `
.change_password__wrapper
    div(component='goBack')
    .change_password
        .profile__pfp
        h1.profile__title
            p(component='profileTitle')
        .change_password__data
            div(component='oldPassword')
            div(component='newPassword')
            div(component='newPasswordConfirm')
`;