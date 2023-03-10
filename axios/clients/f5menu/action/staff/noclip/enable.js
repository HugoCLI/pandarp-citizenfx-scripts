
on('f5menu:action:staff:noclip:enable', () => {
    Profiler.staff.noclip = true;
    emit('staff:noclip', true)
    f5menu_menu_moderator_actions(0)
})