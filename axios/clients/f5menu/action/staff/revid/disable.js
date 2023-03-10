on('f5menu:action:staff:revid:disable', (button) => {
    Profiler.staff.revid = false;
    emit('staff:revid', false)
    if (button)
        f5menu_menu_moderator_actions(1)
})