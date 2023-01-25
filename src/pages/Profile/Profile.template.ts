export default `
.profile__wrapper
    div(component='goBack')
    .profile
        .profile_avatar__wrapper
            img.profile_avatar(src='')
        h1.profile__title
            p(component='profileTitle')
        .profile__data
            div(component='email')
            div(component='login')
            div(component='firstName')
            div(component='lastName')
            div(component='userName')
            div(component='phoneNumber')
            div(component='oldPassword')
            div(component='newPassword')
        .profile__actions
            div(component='updateUserDataAction')
            div(component='changeAvatarAction')
            div(component='logOutAction')
`;