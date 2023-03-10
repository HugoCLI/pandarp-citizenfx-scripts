
RegisterCommand('coords', async (source) => {
    const player = GetUserById(source);
    const coords = GetEntityCoords(player.ped);
    const headings = GetEntityHeading(player.ped);
    console.log(`x= ${coords[0]}, y= ${coords[1]}, z = ${coords[2]}, h = ${headings}`);

});

