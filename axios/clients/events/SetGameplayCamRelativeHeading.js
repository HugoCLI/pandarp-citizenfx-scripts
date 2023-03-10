
onNet('SetGameplayCamRelativeHeading', (heading) => {
    const ped = GetPlayerPed(-1);
    console.log(heading)
    SetGameplayCamRelativeHeading(heading)
})