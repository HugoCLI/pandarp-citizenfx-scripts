local relationshipTypes = {
    'GANG_1',
    'GANG_2',
    'GANG_9',
    'GANG_10',
    'AMBIENT_GANG_LOST',
    'AMBIENT_GANG_MEXICAN',
    'AMBIENT_GANG_FAMILY',
    'AMBIENT_GANG_BALLAS',
    'AMBIENT_GANG_MARABUNTE',
    'AMBIENT_GANG_CULT',
    'AMBIENT_GANG_SALVA',
    'AMBIENT_GANG_WEICHENG',
    'AMBIENT_GANG_HILLBILLY',
    'DEALER',
    'COP',
    'PRIVATE_SECURITY',
    'SECURITY_GUARD',
    'ARMY',
    'MEDIC',
    'FIREMAN',
    'HATES_PLAYER',
    'NO_RELATIONSHIP',
    'SPECIAL',
    'MISSION2',
    'MISSION3',
    'MISSION4',
    'MISSION5',
    'MISSION6',
    'MISSION7',
    'MISSION8'
}



Citizen.CreateThread(function()
    local dict = "anim@mp_player_intmenu@key_fob@"
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Citizen.Wait(0)

    end
    for i = 1, 32 do
        Citizen.InvokeNative(0xDC0F817884CDD856, i, false)
    end
    while true do
        Citizen.Wait(0)
        if GetPlayerWantedLevel(PlayerId()) ~= 0 then
            ClearPlayerWantedLevel(PlayerId())
        end
        DisablePlayerVehicleRewards(PlayerId())

        for _, group in ipairs(relationshipTypes) do
            SetRelationshipBetweenGroups(1, GetHashKey('PLAYER'), GetHashKey(group)) -- could be removed
            SetRelationshipBetweenGroups(1, GetHashKey(group), GetHashKey('PLAYER'))
        end
    end
end)