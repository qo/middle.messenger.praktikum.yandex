export default `
if (type === 'text')
    if (isMine)
        .my-text-message
            .message__content
                div(component='content')
            .my-message__time
                p(component='time')
            .message__status
                p(component='status')
    else
        .friend-text-message
            .message__content
                div(component='content')
            .friend-text-message__time
                p(component='time')
else
    if (isMine)
        .my-image-message
            .message__content
                div(component='content')
            .message__status
                p(component='status')
            .my-message__time
                p(component='time')
    else
        .friend-image-message
            .message__content
                div(component='content')
            .friend-image-message__time
                p(component='time')
`;