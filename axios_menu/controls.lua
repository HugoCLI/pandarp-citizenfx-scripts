local currentSelection = 1 -- Sélection actuelle
local maxSelection = 4 -- Nombre total de sélections dans le menu
local isMenuOpen = 0

function ControlMenu(action)
    SendNUIMessage({ type = 'keypress', keypress = action })
end



    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            if isMenuOpen == 1 then
                if IsControlJustPressed(1, 172) then -- Flèche vers le haut
                    ControlMenu("up")
                elseif IsControlJustPressed(1, 173) then -- Flèche vers le bas
                    ControlMenu("down")
                elseif IsControlJustPressed(1, 174) then -- Flèche vers la gauche
                    ControlMenu("left")
                elseif IsControlJustPressed(1, 175) then -- Flèche vers la droite
                    ControlMenu("right")
                elseif IsControlJustPressed(1, 176) then -- Touche Entrée
                    ControlMenu("enter")
                elseif IsControlJustPressed(1, 177) then -- Touche Echap (retour en arrière)
                    ControlMenu("cancel")
                elseif IsControlJustPressed(1, 178) then -- Touche Suppr (suppression)
                    ControlMenu("cancel")
                end
            end
        end
    end)



RegisterNUICallback('action', function(data)
    isMenuOpen = 0
    if data.type == "fullscreen" then
        if data.fullscreen then
            SetNuiFocus(true, true)
        else
            isMenuOpen = 1
            SetNuiFocus(false, false)
        end
        return
    end
    if data.type == "execute" then
        if data.execute.close then
            isMenuOpen = 0
            SendNUIMessage({ type = 'display', display = 0 })
        end
        isMenuOpen = 1
        if data.execute.callback then
            TriggerEvent(data.execute.callback, data.execute.data)
        end
        return
    end
    SendNUIMessage({ type = 'display', display = 0 })
    TriggerEvent(data.callback, data.items)
end)

RegisterNetEvent('axios_menu:open', function(data)
    SendNUIMessage({ type = 'formCreate', formCreate = data })
    isMenuOpen = 1
end)
  

