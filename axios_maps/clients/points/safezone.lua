

    local safezone_elements = {
        {x= 37.52967071533203, y= -1716.17138671875, z = 31.217529296875},
        {x= -311.76263427734375, y= -893.4593505859375, z = 31.06591796875},
        { x= -1312.852783203125, y= 261.3758239746094, z = 62.760498046875},
    }
    ped = nil
    in_target = false
    coords = nil
    inzone = false


    Citizen.CreateThread(function() 
        while true do

            
            if ped == nil then
                ped = GetPlayerPed(-1)
            end
            coords = GetEntityCoords(ped)

           
            if in_target ~= false then
                Citizen.Wait(3)
                local vehicle = GetVehiclePedIsIn(ped, false)
                NetworkSetFriendlyFireOption(false)
                SetEntityCanBeDamaged(vehicle, false)
                ClearPlayerWantedLevel(PlayerId())
                SetCurrentPedWeapon(ped,GetHashKey("WEAPON_UNARMED"),true)

                if inzone == false then
                    inzone = true
                    TriggerEvent('notify', "success", "Vous entrez dans une zone surveillée")
                end
                dist = #(coords - vector3(in_target.x, in_target.y, in_target.z))
                
                if dist > 100 then
                    inzone = false
                    NetworkSetFriendlyFireOption(true)
                    SetEntityCanBeDamaged(vehicle, true)
                    TriggerEvent('notify', "error", "Vous quittez une zone surveillée")
                    in_target = false
                end
            else
                Citizen.Wait(250)

                for i = 1, #safezone_elements do
                    point = safezone_elements[i];
                    dist = #(coords - vector3(point.x, point.y, point.z))
                    if dist < 100 then
                        in_target = point
                    end
                end
            end
            
        end
    end)

