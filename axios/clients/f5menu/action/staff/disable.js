
on('f5menu:action:staff:disable', () => {
    Profiler.staff.enable = false;
    emit('f5menu:action:staff:revid:disable', true)
    emit('f5menu:action:staff:noclip:disable')
    f5menu_menu_moderator()
})