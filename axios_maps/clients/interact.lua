    

    ped = nil
    coords = nil
    markersInteracts = {}
    points = {
        { x= -1609.9384765625, y= 164.2021942138672, z = 59.845458984375, h = 17.00787353515625, message = "Pour louer un véhicule", callback = "playerLocation" },
    }


    RegisterNetEvent('addPoint', function(data)
        table.insert(points, data)
    end)


    target = nil


    Citizen.CreateThread(function()
        TriggerServerEvent('playerSpawned')
        Citizen.CreateThread(function()
            while true do
                Citizen.Wait(10000)
                TriggerServerEvent('SaveCoords');
            end
        end)
    end)

    RegisterCommand('+interact', function()
        if target then
            print("Interact", target.callback)
            TriggerEvent(target.callback, {target.x, target.y, target.z})
        end
    end, false)

    function ShowHelpNotification(text)
        SetTextComponentFormat('STRING')
        AddTextComponentString("~INPUT_CONTEXT~ " .. text)
        DisplayHelpTextFromStringLabel(0, 0, 1, -1)
    end

    

    local isStart = false
    RegisterNetEvent('displayPoints', function(cb)
        if isStart then
            return
        end
        Citizen.CreateThread(function()
            isStart = true
            cb(true)
            while true do
                --
                Citizen.Wait(1000)
                --
                markersInteracts = {};
                target = nil
                
                if ped == nil then
                    ped = GetPlayerPed(-1)
                end
                coords = GetEntityCoords(ped)
                
                for i = 1, #points do
                    point = points[i];
                   
                    if point.callback then
                        dist = #(coords - vector3(point.x, point.y, point.z))
                        
                        --
                        if dist < 40 then
                            if dist < 3 then
                                target = point
                            end
                            table.insert(markersInteracts, point)
                        end
                    
                    end
                end
        
            end
        end)
        cb(false)
    end)

      

    
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            
            if #markersInteracts > 0 then

                coords = GetEntityCoords(ped)
                for k, point in pairs(markersInteracts) do
                    dist = #(coords - vector3(point.x, point.y, point.z))
                    DrawMarker(1, point.x, point.y, point.z - 1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 3.0, 0.75, 25, 111, 61, 100, false, true, 2, nil, nil, false)
                    if dist < 3 then
                        ShowHelpNotification(point.message)
                    end
                end
            end
        end
    end)

