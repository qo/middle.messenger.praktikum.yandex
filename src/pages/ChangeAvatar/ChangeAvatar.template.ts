export default `
.change_avatar__wrapper
    form.change_avatar(id='avatarForm')
        label.change_avatar__label(for='avatar') Выбрать файл на компьютере
            input.change_avatar__input(type='file', name='avatar' id='avatar')
        button.change_avatar__button(type='submit' form='avatarForm') Поменять`;