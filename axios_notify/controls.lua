


--  SendNUIMessage({ type = 'display', display = 1 })

RegisterNetEvent('notify', function(mode, message)
    SendNUIMessage({ type = 'message', message = message, mode = mode })
end)
  
RegisterNetEvent('interact', function(callback, timeout)
    SendNUIMessage({ type = 'interact', callback = callback, timeout = timeout })
end)
  
RegisterNUICallback('action', function(data)
    if data.type == "interact" then
        TriggerEvent(data.callback)
    end
end)