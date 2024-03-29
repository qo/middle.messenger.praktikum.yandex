export default `
.profile__wrapper
    div(component='goBack')
    .profile
        .profile__pfp
        h1.profile__title
            p(component='profileTitle')
        .profile__data
            div(component='email')
            div(component='login')
            div(component='firstName')
            div(component='lastName')
            div(component='userName')
            div(component='phoneNumber')
        .profile__actions
            div(component='changeDataAction')
            div(component='changePasswordAction')
            div(component='logOutAction')
`;