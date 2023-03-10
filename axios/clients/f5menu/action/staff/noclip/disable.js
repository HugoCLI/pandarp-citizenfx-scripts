
on('f5menu:action:staff:noclip:disable', () => {
    Profiler.staff.noclip = false;
    emit('staff:noclip', false)
    f5menu_menu_moderator_actions(0)
})