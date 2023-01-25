export default `
.chat
    .chat__left
        .chat__left__toolbar
            .chat__left__toolbar__profile_link
                a(component='profileLink')
            .chat__left__toolbar__searchbar
                div(component='searchbar')
        div(component='horizontalDelimiter')
        .chat__left__chat_previews
            div(component='chatPreviewAndrey')
            div(component='chatPreviewAlexandr')
        button(component='createChat').chat__left__create_chat
    div(component='verticalDelimiter')
    .chat__right
        .chat__right__chosen_chat
            .chat__right__chosen_chat__pfp
            .chat__right__chosen_chat__name
                p(component='chosenChatName')
            .chat__right__chosen_chat__actions
                button(component='addUsersButton').chat__right__chosen_chat__actions__add_users
                button(component='removeUsersButton').chat__right__chosen_chat__actions__remove_users
                button(component='deleteChatButton').chat__right__chosen_chat__actions__delete_chat
        div(component='horizontalDelimiter')
        .chat__right__messages__date
            p(component='messagesDate')
        .chat__right__messages
            div(component='chatMessage1')
            div(component='chatMessage2')
            div(component='chatMessage3')
            div(component='chatMessage4')
        div(component='horizontalDelimiter2')
        .chat__right__message_toolbar
            .chat__right__message_toolbar__button-attach
                button(component='attachButton')
            .chat__right__message_toolbar__message_input
                div(component='messageInput')
            .chat__right__message_toolbar__button-send
                button(component='sendButton')
    .form_window(component="addUsersFormWindow" style="display: none")
    .form_window(component="removeUsersFormWindow" style="display: none")
    .form_window(component="deleteChatFormWindow" style="display: none")
`;