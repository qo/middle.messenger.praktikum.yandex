// input.change_password__input(component="input" type='file', name='avatar' id='avatar')

export default `
.change_password__wrapper
        form.change_password(id='avatarForm')
            h2.change_password__title(component="title") Загрузите файл
            label.change_password__label(component="label" for='avatar')
            button.change_password__button(component="button" type='submit' form='avatarForm') Поменять`;