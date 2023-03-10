local disPlayerNames = 100
local playerDistances = {}

local function DrawText3D(position, text, r, g, b)
    local onScreen, _x, _y = World3dToScreen2d(position.x, position.y, position.z + 1.2)
    local dist = #(GetGameplayCamCoords() - position)

    local scale = (1 / dist) * 2
    local fov = (1 / GetGameplayCamFov()) * 100
    local scale = scale * fov

    if onScreen then
        if not useCustomScale then
            SetTextScale(0.0 * scale, 0.55 * scale)
        else
            SetTextScale(0.0 * scale, customScale)
        end
        SetTextFont(0)
        SetTextProportional(1)
        SetTextColour(r, g, b, 255)
        SetTextDropshadow(1, 1, 2, -1, 3, 0)
        SetTextEdge(2, 0, 0, 0, 150)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x, _y)
    end
end
show = false
users = {}
discovers = {};


RegisterNetEvent('staff:revid')
AddEventHandler('staff:revid', function(enable)
    if enable then
        showRevid()
    else
        unShowRevid()
    end
end)

function showRevid() 
    if show then
        return
    end
    show = true
    Citizen.CreateThread(function()
        while true do
            if show == false then
                break;
            end
            Citizen.Wait(0)
            for _, id in ipairs(GetActivePlayers()) do
    
                local server_id = string.gsub(GetPlayerServerId(id), "%s+", "")
                local targetPed = GetPlayerPed(id)
                local targetPedCords = GetEntityCoords(targetPed)
                local speed = GetEntitySpeed(targetPed) * 3.6
                print(speed)
                
                if users[id] then
                    DrawText3D(targetPedCords, users[id].prenom + " " + users[id].nom, 40, 180, 99)
                else
                    DrawText3D(targetPedCords, GetPlayerName(id), 40, 180, 99)
                end
            end
        end
    end)
    Citizen.CreateThread(function()
        while true do
            if show == false then
                break;
            end
            Citizen.Wait(2000)
        end
    end)

end
function unShowRevid()
    show = false
end