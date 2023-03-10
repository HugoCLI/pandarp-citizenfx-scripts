RegisterCommand('car', async (source, args) => {
    if (source === 0) return;
    const user = GetUserById(source);
    if (!user) return;
    if (!roles[user.role].mod) return;

    emitNet('commands:car', source, args[0]);
});