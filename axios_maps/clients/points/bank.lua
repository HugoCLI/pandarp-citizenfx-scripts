    
    
    local banques_points = {
        {x= 149.85, y= -1041.34, z= 29.39},
        {x= -1212.980, y= -330.841, z= 37.787},
        {x= -2962.59, y= 482.5, z= 15.703},
        {x= -112.202, y= 6469.295, z= 31.626},
        {x= 314.187, y= -278.621, z= 54.170},
        {x= -351.534, y= -49.529, z= 49.042},
        {x= 241.727, y= 220.706, z= 106.286},
        {x= 1175.064, y= 2706.643, z= 38.094}
    }
    local banques_message = "Pour ouvrir la Banque"

    
    for i, value in ipairs(banques_points) do
        value.message = banques_message
        value.callback = "bank:open"

        table.insert(points, value)
        banques_points[i].blip = AddBlipForCoord(value.x, value.y, value.z)
        SetBlipSprite(banques_points[i].blip, 207)
        SetBlipDisplay(banques_points[i].blip, 4)
        SetBlipScale(banques_points[i].blip, 0.6)
        SetBlipColour(banques_points[i].blip, 69)
        SetBlipAsShortRange(banques_points[i].blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Banque")
        EndTextCommandSetBlipName(banques_points[i].blip)
        
    end


