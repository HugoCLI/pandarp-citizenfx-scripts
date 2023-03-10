    
    
    local clothes_shop = {
        {x=427.95, y=-799.90, z=29.48},
        {x=72.53, y=-1398.91, z=29.36},
        {x=-168.91, y=-299.35, z=39.73},
        {x=123.78, y=-218.94, z=54.55},
        {x=-828.70, y=-1074.42, z=11.32},
    }
    local clothes_message = "Pour ouvrir le Magasin de vêtement"

    
    for i, value in ipairs(clothes_shop) do
        value.message = clothes_message
        value.callback = "banco:open"

        table.insert(points, value)
        clothes_shop[i].blip = AddBlipForCoord(value.x, value.y, value.z)
        SetBlipSprite(clothes_shop[i].blip, 480)
        SetBlipDisplay(clothes_shop[i].blip, 4)
        SetBlipScale(clothes_shop[i].blip, 0.6)
        SetBlipColour(clothes_shop[i].blip, 5)
        SetBlipAsShortRange(clothes_shop[i].blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Magasin de vêtement")
        EndTextCommandSetBlipName(clothes_shop[i].blip)
        
    end


