
let users = {};
onNet('addMember', (uuid, data) => {
    users[uuid] = data;
    console.log(`added ${uuid}`)
})


onNet('removeMember', (uuid) => {
    if (!users[uuid]) return;
    delete users[uuid];
    console.log(`delete ${uuid}`)
})