
local ped = nil
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        ped = GetPlayerPed(-1);
        SetEntityLocallyVisible(ped)
    end
end)