    
    
    local garages_points = {
        {x= 37.52967071533203, y= -1716.17138671875, z = 31.217529296875},
        {x= -311.76263427734375, y= -893.4593505859375, z = 31.06591796875},
        { x= -1312.852783203125, y= 261.3758239746094, z = 62.760498046875},
    }
    local garage_message = "Pour ouvrir le Garage"

    
    for i, value in ipairs(garages_points) do
        value.message = garage_message
        value.callback = "garage:open"

        table.insert(points, value)
        garages_points[i].blip = AddBlipForCoord(value.x, value.y, value.z)
        SetBlipSprite(garages_points[i].blip, 50)
        SetBlipDisplay(garages_points[i].blip, 4)
        SetBlipScale(garages_points[i].blip, 0.9)
        SetBlipColour(garages_points[i].blip, 0)
        SetBlipAsShortRange(garages_points[i].blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Garage")
        EndTextCommandSetBlipName(garages_points[i].blip)
        
    end


