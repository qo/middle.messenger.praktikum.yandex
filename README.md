# Описание

Реализация мессенджера с помощью компонентного подхода.

# Команды

## npm run build - установка зависимостей и сборка

Тут Parcel собирает html, scss и ts и кладет html и css в папку dist.

## npm run serve - старт сервера на localhost:3000

Тут Express раздает статику из папки dist. Чтобы юзать эту команду, предварительно надо собрать проект через npm run build.

## npm run start - сборка и запуск сервера

Тут просто запускаются build и serve вместе

# Деплой

Для деплоя на Netlify нужно указать:
- npm run build в качестве build command.
- dist в качестве publish directory.

# Мой деплой

https://middle-messenger.netlify.app/

# Макет

https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1
