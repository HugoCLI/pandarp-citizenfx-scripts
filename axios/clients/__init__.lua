
local points = {
  { x= 712.945068359375, y= 4093.410888671875, z= 34.7222900390625, h= 0, message= "Pour récolter de l'ecstasy", callback= "recolte:ecstasy" },
  { x= 2425.81982421875, y= 3092.822021484375, z= 48.943603515625, h= 189.9212646484375, message= "Pour traiter de l'ecstasy", callback= "traiter:ecstasy" },
  { x= 860.887939453125, y= -2303.72314453125, z= 30.3414306640625, h= 331.6535339355469, message= "Pour vendre de l'ecstasy", callback= "vendre:ecstasy" },
  { x= 440.69012451171875, y= 6459.61328125, z= 35.851318359375, h= 93.54330444335938, message= "Pour récolter de la Méthamphétamine", callback= "recolte:methamphetamine" },
  { x= 2432.21533203125, y= 4969.96484375, z= 42.3385009765625, h= 232.44094848632812, message= "Pour traiter la Méthamphétamine", callback= "traiter:methamphetamine" },
  { x= -1147.239501953125, y= -1564.10107421875, z= 4.4095458984375, h= 240.94488525390625, message= "Pour vendre de la Méthamphétamine", callback= "vendre:methamphetamine" },
  { x= 923.7494506835938, y= -1518.817626953125, z = 30.99853515625, h = 345.8267822265625, message="Pour blanchir de l'argent", callback="blanchir"},

  { x= -38.30769348144531, y= -1100.4791259765625, z = 26.3648681640625, h = 133.2283477783203, message="[job] Pour accéder au Concessionnaire", callback="concess:open"},
  -- { x= -211.37142944335938, y= -1325.6439208984375, z = 30.880615234375, h = 291.968505859375, message="[job] Pour accéder au LS Custom", callback="ls_custom:open"}
}

AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
      return
    end

    print("Ressource OK")
    TriggerServerEvent('playerSpawned', true)
    Citizen.Wait(100)
    TriggerServerEvent('playerProfiler')
    Citizen.Wait(100)
    TriggerEvent('displayPoints', function(status)
        if status == true then
            for i = 1, #points do
                point = points[i];
                print("addPoint OK")
                TriggerEvent('addPoint', point)
            end
        end
    end)

    
end)
  