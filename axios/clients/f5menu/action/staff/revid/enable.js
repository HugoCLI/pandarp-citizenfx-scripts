
on('f5menu:action:staff:revid:enable', (button) => {
    Profiler.staff.revid = true;
    emit('staff:revid', true)
    if (button)
        f5menu_menu_moderator_actions(1)
})