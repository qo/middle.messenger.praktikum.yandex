# Описание

Верстка мессенджера с помощью шаблонизатора Pug, препроцессора SASS и сборщика Parcel.
Раздача статики на локальном сервере через Express.

# Команды

## npm run build - установка зависимостей и сборка

Тут Parcel собирает Pug и SASS и кладет html и css в папку dist.

## npm run start - старт сервера на localhost:3000

Тут Express раздает статику из папки dist. Чтобы юзать эту команду, предварительно надо собрать проект через npm run build.

# Деплой

Для деплоя на Netlify нужно указать:
npm run build в качестве build command.
dist в качестве publish directory.

# Мой деплой

https://middle-messenger.netlify.app/

# Макет

https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1