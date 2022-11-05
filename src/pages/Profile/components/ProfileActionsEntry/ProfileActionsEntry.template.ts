export default `
.profile_actions_entry_wrapper
    .profile_actions_entry
        if (color === 'blue')
            a(component='actionLink').profile_actions_entry__link-blue
        if (color === 'red')
            a(component='actionLink').profile_actions_entry__link-red
    div(component='delimiter')
`;