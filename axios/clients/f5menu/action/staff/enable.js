
on('f5menu:action:staff:enable', () => {
    Profiler.staff.enable = true;
    emit('f5menu:action:staff:revid:enable', true)
    f5menu_menu_moderator()
})