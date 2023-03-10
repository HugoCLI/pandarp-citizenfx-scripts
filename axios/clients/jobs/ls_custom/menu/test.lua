RegisterCommand(
    "vehicle",
    function(source, args)
        
        local category = args[1]
        if category == "spawn" then
            local vehicle = args[2]
            local carPaint = colors.metal["Pure Gold"]
            local veh = spawnVeh(vehicle, true)
            print(string.format("Spawned in a(n) %s.", GetLabelText(GetDisplayNameFromVehicleModel(vehicle))))
            SetVehicleColours(veh, carPaint, carPaint)

            local basespeed = GetVehicleModelEstimatedMaxSpeed(GetHashKey(vehicle));
            local highspeed = basespeed * 1.25 - 26

            print("Base:", basespeed * 3.6, "High: ", (highspeed) * 3.6)
            TriggerEvent('notify', "success", "Base: "..basespeed * 3.6 .." High: "..highspeed * 3.6)
            ModifyVehicleTopSpeed(veh, highspeed - 26)

            local newspeed = GetVehicleModelEstimatedMaxSpeed(GetHashKey(vehicle));
            print("New speed: "..newspeed * 3.6)


        elseif category == "customize" then
            local veh = GetVehiclePedIsIn(PlayerPedId(), false)
            SetVehicleModKit(veh, 0)
            for modType = 0, 10, 1 do 
                -- You can do 50 iterations total 
                -- to loop through ALL customizations 
                -- the first 10 iterations will
                -- apply body features
                local bestMod = GetNumVehicleMods(veh, modType)-1 -- we will subtract by one to notice differences easier (imo)
                SetVehicleMod(veh, modType, bestMod, false)
            end
        elseif category == "extras" then
            local veh = GetVehiclePedIsIn(PlayerPedId(), false)
            for id=0, 20 do
                if DoesExtraExist(veh, id) then
                    SetVehicleExtra(veh, id, 1) -- p3 should be 0 for off or 1 for on
                end
            end
        elseif category == "repair" then
            local veh = GetVehiclePedIsIn(PlayerPedId(), false)
            SetVehicleFixed(veh)
            SetVehicleEngineHealth(veh, 1000.0) -- https://runtime.fivem.net/doc/natives/?_0x45F6D8EEF34ABEF1
        elseif category == "doors" then
            local veh = GetVehiclePedIsIn(PlayerPedId(), false)
            local open = GetVehicleDoorAngleRatio(veh, 0) < 0.1
            if open then
                for i = 0, 7, 1 do
                    SetVehicleDoorOpen(veh, i, false, false)
                end
            else
                SetVehicleDoorsShut(veh, false)
            end
        elseif category == "upgrade" then
            --[[
                16 - Armor
                15 - Suspension
                13 - Transmission
                14 - Horn
                12 - Brakes
                11 - Engine

             ]]
            --https://github.com/Sighmir/FiveM-Scripts/blob/master/vrp/vrp_lscustoms/client.lua
            --https://github.com/TomGrobbe/vMenu/blob/master/vMenu/menus/VehicleOptions.cs#L1713
            local veh = GetVehiclePedIsIn(PlayerPedId(), false)
            local color = colors.matte["Red"]
            local ourSelection = {
                -- These will be the upgrades we want to install
                ["Armour"] = "Armor Upgrade 100%",
                ["Engine"] = "EMS Upgrade, Level 4",
                ["Transmission"] = "Race Transmission",
                ["Suspension"] = "Competition Suspension",
                ["Horns"] = "Sadtrombone Horn",
                ["Brakes"] = "Race Brakes",
                ["Lights"] = "Xenon Lights",
                ["Turbo"] = "Turbo Tuning"
            }
            SetVehicleModKit(veh, 0) -- this has to be called before setting vehicle mods
            for k, v in pairs(ourSelection) do
                local modType = upgrades[k].type
                local mod = upgrades[k].types[v].index
                ApplyVehicleMod(veh, modType, mod)
            end
            SetVehicleColours(veh, color, color)
            ToggleVehicleMod(veh, upgrades["Lights"].type, true)
            -- pretty sure light colors will only work if you have xenon lights equipped
            SetVehicleXenonLightsColour(veh, upgrades["Lights"].xenonHeadlightColors["Red"].index)
            
        end
    end
)

function spawnVeh(car, persistent)
    persistent = persistent or false
    local car = GetHashKey(car)
    RequestModel(car)
    while not HasModelLoaded(car) do
        RequestModel(car)
        Citizen.Wait(50)
    end

    local x, y, z = table.unpack(GetEntityCoords(PlayerPedId(), false))
    local vehicle = CreateVehicle(car, x + 2, y + 2, z + 1, GetEntityHeading(PlayerPedId()), true, false)
    SetPedIntoVehicle(PlayerPedId(), vehicle, -1)

    SetEntityAsNoLongerNeeded(vehicle)
    SetModelAsNoLongerNeeded(veh)

    if persistent then
        SetEntityAsMissionEntity(vehicle, true, true)
    end
    return vehicle
end

function ApplyVehicleMod(vehicle, modType, mod)
    if type(mod) == "boolean" then
        ToggleVehicleMod(vehicle, modType, mod)
    else
        SetVehicleMod(vehicle, modType, mod, false)
    end
end

-- data taken from:
-- https://pastebin.com/pwHci0xK and https://github.com/TomGrobbe/vMenu/blob/master/vMenu/data/VehicleData.cs
colors = {
    classic = {
        ["Black"] = 0,
        ["Carbon Black"] = 147,
        ["Graphite"] = 1,
        ["Anhracite Black"] = 11,
        ["Black Steel"] = 2,
        ["Dark Steel"] = 3,
        ["Silver"] = 4,
        ["Bluish Silver"] = 5,
        ["Rolled Steel"] = 6,
        ["Shadow Silver"] = 7,
        ["Stone Silver"] = 8,
        ["Midnight Silver"] = 9,
        ["Cast Iron Silver"] = 10,
        ["Red"] = 27,
        ["Torino Red"] = 28,
        ["Formula Red"] = 29,
        ["Lava Red"] = 150,
        ["Blaze Red"] = 30,
        ["Grace Red"] = 31,
        ["Garnet Red"] = 32,
        ["Sunset Red"] = 33,
        ["Cabernet Red"] = 34,
        ["Wine Red"] = 143,
        ["Candy Red"] = 35,
        ["Hot Pink"] = 135,
        ["Pfsiter Pink"] = 137,
        ["Salmon Pink"] = 136,
        ["Sunrise Orange"] = 36,
        ["Orange"] = 38,
        ["Bright Orange"] = 138,
        ["Gold"] = 99,
        ["Bronze"] = 90,
        ["Yellow"] = 88,
        ["Race Yellow"] = 89,
        ["Dew Yellow"] = 91,
        ["Dark Green"] = 49,
        ["Racing Green"] = 50,
        ["Sea Green"] = 51,
        ["Olive Green"] = 52,
        ["Bright Green"] = 53,
        ["Gasoline Green"] = 54,
        ["Lime Green"] = 92,
        ["Midnight Blue"] = 141,
        ["Galaxy Blue"] = 61,
        ["Dark Blue"] = 62,
        ["Saxon Blue"] = 63,
        ["Blue"] = 64,
        ["Mariner Blue"] = 65,
        ["Harbor Blue"] = 66,
        ["Diamond Blue"] = 67,
        ["Surf Blue"] = 68,
        ["Nautical Blue"] = 69,
        ["Racing Blue"] = 73,
        ["Ultra Blue"] = 70,
        ["Light Blue"] = 74,
        ["Chocolate Brown"] = 96,
        ["Bison Brown"] = 101,
        ["Creeen Brown"] = 95,
        ["Feltzer Brown"] = 94,
        ["Maple Brown"] = 97,
        ["Beechwood Brown"] = 103,
        ["Sienna Brown"] = 104,
        ["Saddle Brown"] = 98,
        ["Moss Brown"] = 100,
        ["Woodbeech Brown"] = 102,
        ["Straw Brown"] = 99,
        ["Sandy Brown"] = 105,
        ["Bleached Brown"] = 106,
        ["Schafter Purple"] = 71,
        ["Spinnaker Purple"] = 72,
        ["Midnight Purple"] = 142,
        ["Bright Purple"] = 145,
        ["Cream"] = 107,
        ["Ice White"] = 111,
        ["Frost White"] = 112
    },
    matte = {
        ["Black"] = 12,
        ["Gray"] = 13,
        ["Light Gray"] = 14,
        ["Ice White"] = 131,
        ["Blue"] = 83,
        ["Dark Blue"] = 82,
        ["Midnight Blue"] = 84,
        ["Midnight Purple"] = 149,
        ["Schafter Purple"] = 148,
        ["Red"] = 39,
        ["Dark Red"] = 40,
        ["Orange"] = 41,
        ["Yellow"] = 42,
        ["Lime Green"] = 55,
        ["Green"] = 128,
        ["Forest Green"] = 151,
        ["Foliage Green"] = 155,
        ["Olive Darb"] = 152,
        ["Dark Earth"] = 153,
        ["Desert Tan"] = 154
    },
    metal = {
        ["Brushed Steel"] = 117,
        ["Brushed Black Steel"] = 118,
        ["Brushed Aluminum"] = 119,
        ["Pure Gold"] = 158,
        ["Brushed Gold"] = 159
    },
    utility = {
        ["BLACK"] = 15,
        ["FMMC_COL1_1"] = 16,
        ["DARK_SILVER"] = 17,
        ["SILVER"] = 18,
        ["BLACK_STEEL"] = 19,
        ["SHADOW_SILVER"] = 20,
        ["DARK_RED"] = 43,
        ["RED"] = 44,
        ["GARNET_RED"] = 45,
        ["DARK_GREEN"] = 56,
        ["GREEN"] = 57,
        ["DARK_BLUE"] = 75,
        ["MIDNIGHT_BLUE"] = 76,
        ["SAXON_BLUE"] = 77,
        ["NAUTICAL_BLUE"] = 78,
        ["BLUE"] = 79,
        ["FMMC_COL1_13"] = 80,
        ["BRIGHT_PURPLE"] = 81,
        ["STRAW_BROWN"] = 93,
        ["UMBER_BROWN"] = 108,
        ["MOSS_BROWN"] = 109,
        ["SANDY_BROWN"] = 110,
        ["veh_color_off_white"] = 122,
        ["BRIGHT_GREEN"] = 125,
        ["HARBOR_BLUE"] = 127,
        ["FROST_WHITE"] = 134,
        ["LIME_GREEN"] = 139,
        ["ULTRA_BLUE"] = 140,
        ["GREY"] = 144,
        ["LIGHT_BLUE"] = 157,
        ["YELLOW"] = 160
    },
    worn = {
        ["BLACK"] = 21,
        ["GRAPHITE"] = 22,
        ["LIGHT_GREY"] = 23,
        ["SILVER"] = 24,
        ["BLUE_SILVER"] = 25,
        ["SHADOW_SILVER"] = 26,
        ["RED"] = 46,
        ["SALMON_PINK"] = 47,
        ["DARK_RED"] = 48,
        ["DARK_GREEN"] = 58,
        ["GREEN"] = 59,
        ["SEA_GREEN"] = 60,
        ["DARK_BLUE"] = 85,
        ["BLUE"] = 86,
        ["LIGHT_BLUE"] = 87,
        ["SANDY_BROWN"] = 113,
        ["BISON_BROWN"] = 114,
        ["CREEK_BROWN"] = 115,
        ["BLEECHED_BROWN"] = 116,
        ["veh_color_off_white"] = 121,
        ["ORANGE"] = 123,
        ["SUNRISE_ORANGE"] = 124,
        ["veh_color_taxi_yellow"] = 126,
        ["RACING_GREEN"] = 129,
        ["ORANGE"] = 130,
        ["WHITE"] = 131,
        ["FROST_WHITE"] = 132,
        ["OLIVE_GREEN"] = 133
    },
    chrome = 120
}

upgrades = {
    ["Suspension"] = {
        type = 13,
        types = {
            ["Stock Suspension"] = {index = -1},
            ["Lowered Suspension"] = {index = false},
            ["Street Suspension"] = {index = 1},
            ["Sport Suspension"] = {index = 2},
            ["Competition Suspension"] = {index = 3}
        }
    },
    ["Armour"] = {
        type = 16,
        types = {
            ["None"] = {index = -1},
            ["Armor Upgrade 20%"] = {index = false},
            ["Armor Upgrade 40%"] = {index = 1},
            ["Armor Upgrade 60%"] = {index = 2},
            ["Armor Upgrade 80%"] = {index = 3},
            ["Armor Upgrade 100%"] = {index = 4}
        }
    },
    ["Transmission"] = {
        type = 13,
        types = {
            ["Stock Transmission"] = {index = -1},
            ["Street Transmission"] = {index = false},
            ["Sports Transmission"] = {index = 1},
            ["Race Transmission"] = {index = 2}
        }
    },
    ["Turbo"] = {
        type = 18,
        types = {
            ["None"] = {index = false},
            ["Turbo Tuning"] = {index = true}
        }
    },
    ["Lights"] = {
        type = 22,
        types = {
            ["Stock Lights"] = {index = false},
            ["Xenon Lights"] = {index = true}
        },
        xenonHeadlightColors = {
            ["Default"] = {index = -1},
            ["White"] = {index = 0},
            ["Blue"] = {index = 1},
            ["Electric_Blue"] = {index = 2},
            ["Mint_Green"] = {index = 3},
            ["Lime_Green"] = {index = 4},
            ["Yellow"] = {index = 5},
            ["Golden_Shower"] = {index = 6},
            ["Orange"] = {index = 7},
            ["Red"] = {index = 8},
            ["Pony_Pink"] = {index = 9},
            ["Hot_Pink"] = {index = 10},
            ["Purple"] = {index = 11},
            ["Blacklight"] = {index = 12}
        }
    },
    ["Engine"] = {
        type = 11,
        types = {
            ["EMS Upgrade, Level 1"] = {index = -1},
            ["EMS Upgrade, Level 2"] = {index = false},
            ["EMS Upgrade, Level 3"] = {index = 1},
            ["EMS Upgrade, Level 4"] = {index = 2}
        }
    },
    ["Brakes"] = {
        type = 12,
        types = {
            ["Stock Brakes"] = {index = -1},
            ["Street Brakes"] = {index = false},
            ["Sport Brakes"] = {index = 1},
            ["Race Brakes"] = {index = 2}
        }
    },
    ["Horns"] = {
        type = 14,
        types = {
            ["Stock Horn"] = {index = -1},
            ["Truck Horn"] = {index = false},
            ["Police Horn"] = {index = 1},
            ["Clown Horn"] = {index = 2},
            ["Musical Horn 1"] = {index = 3},
            ["Musical Horn 2"] = {index = 4},
            ["Musical Horn 3"] = {index = 5},
            ["Musical Horn 4"] = {index = 6},
            ["Musical Horn 5"] = {index = 7},
            ["Sadtrombone Horn"] = {index = 8},
            ["Calssical Horn 1"] = {index = 9},
            ["Calssical Horn 2"] = {index = 10},
            ["Calssical Horn 3"] = {index = 11},
            ["Calssical Horn 4"] = {index = 12},
            ["Calssical Horn 5"] = {index = 13},
            ["Calssical Horn 6"] = {index = 14},
            ["Calssical Horn 7"] = {index = 15},
            ["Scaledo Horn"] = {index = 16},
            ["Scalere Horn"] = {index = 17},
            ["Scalemi Horn"] = {index = 18},
            ["Scalefa Horn"] = {index = 19},
            ["Scalesol Horn"] = {index = 20},
            ["Scalela Horn"] = {index = 21},
            ["Scaleti Horn"] = {index = 22},
            ["Scaledo Horn High"] = {index = 23},
            ["Jazz Horn 1"] = {index = 25},
            ["Jazz Horn 2"] = {index = 26},
            ["Jazz Horn 3"] = {index = 27},
            ["Jazzloop Horn"] = {index = 28},
            ["Starspangban Horn 1"] = {index = 29},
            ["Starspangban Horn 2"] = {index = 30},
            ["Starspangban Horn 3"] = {index = 31},
            ["Starspangban Horn 4"] = {index = 32},
            ["Classicalloop Horn 1"] = {index = 33},
            ["Classical Horn 8"] = {index = 34},
            ["Classicalloop Horn 2"] = {index = 35}
        }
    },
    ["Wheels"] = {
        type = 23,
        ["suv"] = {
            type = 3,
            types = {
                ["Stock"] = {index = -1},
                ["Vip"] = {index = false},
                ["Benefactor"] = {index = 1},
                ["Cosmo"] = {index = 2},
                ["Bippu"] = {index = 3},
                ["Royalsix"] = {index = 4},
                ["Fagorme"] = {index = 5},
                ["Deluxe"] = {index = 6},
                ["Icedout"] = {index = 7},
                ["Cognscenti"] = {index = 8},
                ["Lozspeedten"] = {index = 9},
                ["Supernova"] = {index = 10},
                ["Obeyrs"] = {index = 11},
                ["Lozspeedballer"] = {index = 12},
                ["Extra vaganzo"] = {index = 13},
                ["Splitsix"] = {index = 14},
                ["Empowered"] = {index = 15},
                ["Sunrise"] = {index = 16},
                ["Dashvip"] = {index = 17},
                ["Cutter"] = {index = 18}
            }
        },
        ["sport"] = {
            type = false,
            types = {
                ["Stock"] = {index = -1},
                ["Inferno"] = {index = false},
                ["Deepfive"] = {index = 1},
                ["Lozspeed"] = {index = 2},
                ["Diamondcut"] = {index = 3},
                ["Chrono"] = {index = 4},
                ["Feroccirr"] = {index = 5},
                ["Fiftynine"] = {index = 6},
                ["Mercie"] = {index = 7},
                ["Syntheticz"] = {index = 8},
                ["Organictyped"] = {index = 9},
                ["Endov1"] = {index = 10},
                ["Duper7"] = {index = 11},
                ["Uzer"] = {index = 12},
                ["Groundride"] = {index = 13},
                ["Spacer"] = {index = 14},
                ["Venum"] = {index = 15},
                ["Cosmo"] = {index = 16},
                ["Dashvip"] = {index = 17},
                ["Icekid"] = {index = 18},
                ["Ruffeld"] = {index = 19},
                ["Wangenmaster"] = {index = 20},
                ["Superfive"] = {index = 21},
                ["Endov2"] = {index = 22},
                ["Slitsix"] = {index = 23}
            }
        },
        ["offroad"] = {
            type = 4,
            types = {
                ["Stock"] = {index = -1},
                ["Raider"] = {index = false},
                ["Mudslinger"] = {index = 1},
                ["Nevis"] = {index = 2},
                ["Cairngorm"] = {index = 3},
                ["Amazon"] = {index = 4},
                ["Challenger"] = {index = 5},
                ["Dunebasher"] = {index = 6},
                ["Fivestar"] = {index = 7},
                ["Rockcrawler"] = {index = 8},
                ["Milspecsteelie"] = {index = 9}
            }
        },
        ["tuner"] = {
            type = 5,
            types = {
                ["Stock"] = {index = -1},
                ["Cosmo"] = {index = false},
                ["Supermesh"] = {index = 1},
                ["Outsider"] = {index = 2},
                ["Rollas"] = {index = 3},
                ["Driffmeister"] = {index = 4},
                ["Slicer"] = {index = 5},
                ["Elquatro"] = {index = 6},
                ["Dubbed"] = {index = 7},
                ["Fivestar"] = {index = 8},
                ["Slideways"] = {index = 9},
                ["Apex"] = {index = 10},
                ["Stancedeg"] = {index = 11},
                ["Countersteer"] = {index = 12},
                ["Endov1"] = {index = 13},
                ["Endov2dish"] = {index = 14},
                ["Guppez"] = {index = 15},
                ["Chokadori"] = {index = 16},
                ["Chicane"] = {index = 17},
                ["Saisoku"] = {index = 18},
                ["Dishedeight"] = {index = 19},
                ["Fujiwara"] = {index = 20},
                ["Zokusha"] = {index = 21},
                ["Battlevill"] = {index = 22},
                ["Rallymaster"] = {index = 23}
            }
        },
        ["highend"] = {
            type = 7,
            types = {
                ["Stock"] = {index = -1},
                ["Shadow"] = {index = false},
                ["Hyper"] = {index = 1},
                ["Blade"] = {index = 2},
                ["Diamond"] = {index = 3},
                ["Supagee"] = {index = 4},
                ["Chromaticz"] = {index = 5},
                ["Merciechlip"] = {index = 6},
                ["Obeyrs"] = {index = 7},
                ["Gtchrome"] = {index = 8},
                ["Cheetahr"] = {index = 9},
                ["Solar"] = {index = 10},
                ["Splitten"] = {index = 11},
                ["Dashvip"] = {index = 12},
                ["Lozspeedten"] = {index = 13},
                ["Carboninferno"] = {index = 14},
                ["Carbonshadow"] = {index = 15},
                ["Carbonz"] = {index = 16},
                ["Carbonsolar"] = {index = 17},
                ["Carboncheetahr"] = {index = 18},
                ["Carbonsracer"] = {index = 19}
            }
        },
        ["lowrider"] = {
            type = 2,
            types = {
                ["Stock"] = {index = -1},
                ["Flare"] = {index = false},
                ["Wired"] = {index = 1},
                ["Triplegolds"] = {index = 2},
                ["Bigworm"] = {index = 3},
                ["Sevenfives"] = {index = 4},
                ["Splitsix"] = {index = 5},
                ["Freshmesh"] = {index = 6},
                ["Leadsled"] = {index = 7},
                ["Turbine"] = {index = 8},
                ["Superfin"] = {index = 9},
                ["Classicrod"] = {index = 10},
                ["Dollar"] = {index = 11},
                ["Dukes"] = {index = 12},
                ["Lowfive"] = {index = 13},
                ["Gooch"] = {index = 14}
            }
        },
        ["muscle"] = {
            type = 1,
            types = {
                ["Stock"] = {index = -1},
                ["Classicfive"] = {index = false},
                ["Dukes"] = {index = 1},
                ["Musclefreak"] = {index = 2},
                ["Kracka"] = {index = 3},
                ["Azrea"] = {index = 4},
                ["Mecha"] = {index = 5},
                ["Blacktop"] = {index = 6},
                ["Dragspl"] = {index = 7},
                ["Revolver"] = {index = 8},
                ["Classicrod"] = {index = 9},
                ["Spooner"] = {index = 10},
                ["Fivestar"] = {index = 11},
                ["Oldschool"] = {index = 12},
                ["Eljefe"] = {index = 13},
                ["Dodman"] = {index = 14},
                ["Sixgun"] = {index = 15},
                ["Mercenary"] = {index = 16}
            }
        }
    }
}

-- iteratable
--[[ for k, v in pairs(upgrades["Suspension"].types) do
    print(k, v.index)
end
 ]]

 vehicles = {
    compacts = {
        "BLISTA",
        "BRIOSO",
        "DILETTANTE",
        "DILETTANTE2",
        "ISSI2",
        "ISSI3",
        "ISSI4", -- MPCHRISTMAS2018 DLC
        "ISSI5", -- MPCHRISTMAS2018 DLC
        "ISSI6", -- MPCHRISTMAS2018 DLC
        "PANTO",
        "PRAIRIE",
        "RHAPSODY",
    },
    sedans = {
        "ASEA",
        "ASEA2",
        "ASTEROPE",
        "COG55",
        "COG552",
        "COGNOSCENTI",
        "COGNOSCENTI2",
        "EMPEROR",
        "EMPEROR2",
        "EMPEROR3",
        "FUGITIVE",
        "GLENDALE",
        "INGOT",
        "INTRUDER",
        "LIMO2",
        "PREMIER",
        "PRIMO",
        "PRIMO2",
        "REGINA",
        "ROMERO",
        "SCHAFTER2",
        "SCHAFTER5",
        "SCHAFTER6",
        "STAFFORD", -- dlc (mpbattle)
        "STANIER",
        "STRATUM",
        "STRETCH",
        "SUPERD",
        "SURGE",
        "TAILGATER",
        "WARRENER",
        "WASHINGTON",
    },
    suvs = {
        "BALLER",
        "BALLER2",
        "BALLER3",
        "BALLER4",
        "BALLER5",
        "BALLER6",
        "BJXL",
        "CAVALCADE",
        "CAVALCADE2",
        "CONTENDER",
        "DUBSTA",
        "DUBSTA2",
        "FQ2",
        "GRANGER",
        "GRESLEY",
        "HABANERO",
        "HUNTLEY",
        "LANDSTALKER",
        "MESA",
        "MESA2",
        "NOVAK", -- Casino DLC
        "PATRIOT",
        "PATRIOT2", -- dlc (mpbattle)
        "RADI",
        "ROCOTO",
        "SEMINOLE",
        "SERRANO",
        "TOROS", -- MPCHRISTMAS2018 DLC
        "XLS",
        "XLS2",
    },
    coupes = {
        "COGCABRIO",
        "EXEMPLAR",
        "F620",
        "FELON",
        "FELON2",
        "JACKAL",
        "ORACLE",
        "ORACLE2",
        "SENTINEL",
        "SENTINEL2",
        "WINDSOR",
        "WINDSOR2",
        "ZION",
        "ZION2",
    },
    muscles = {
        "BLADE",
        "BUCCANEER",
        "BUCCANEER2",
        "CHINO",
        "CHINO2",
        "CLIQUE", -- MPCHRISTMAS2018 DLC
        "COQUETTE3",
        "DEVIANT", -- MPCHRISTMAS2018 DLC
        "DOMINATOR",
        "DOMINATOR2",
        "DOMINATOR3",
        "DOMINATOR4", -- MPCHRISTMAS2018 DLC
        "DOMINATOR5", -- MPCHRISTMAS2018 DLC
        "DOMINATOR6", -- MPCHRISTMAS2018 DLC
        "DUKES",
        "DUKES2",
        "ELLIE",
        "FACTION",
        "FACTION2",
        "FACTION3",
        "GAUNTLET",
        "GAUNTLET2",
        "GAUNTLET3", -- Casino DLC
        "GAUNTLET4", -- Casino DLC
        "HERMES",
        "HOTKNIFE",
        "HUSTLER",
        "IMPALER", -- MPCHRISTMAS2018 DLC
        "IMPALER2", -- MPCHRISTMAS2018 DLC
        "IMPALER3", -- MPCHRISTMAS2018 DLC
        "IMPALER4", -- MPCHRISTMAS2018 DLC
        "IMPERATOR", -- MPCHRISTMAS2018 DLC
        "IMPERATOR2", -- MPCHRISTMAS2018 DLC
        "IMPERATOR3", -- MPCHRISTMAS2018 DLC
        "LURCHER",
        "MOONBEAM",
        "MOONBEAM2",
        "NIGHTSHADE",
        "PEYOTE2", -- Casino DLC
        "PHOENIX",
        "PICADOR",
        "RATLOADER",
        "RATLOADER2",
        "RUINER",
        "RUINER2",
        "RUINER3",
        "SABREGT",
        "SABREGT2",
        "SLAMVAN",
        "SLAMVAN2",
        "SLAMVAN3",
        "SLAMVAN4", -- MPCHRISTMAS2018 DLC
        "SLAMVAN5", -- MPCHRISTMAS2018 DLC
        "SLAMVAN6", -- MPCHRISTMAS2018 DLC
        "STALION",
        "STALION2",
        "TAMPA",
        "TAMPA3",
        "TULIP", -- MPCHRISTMAS2018 DLC
        "VAMOS", -- MPCHRISTMAS2018 DLC
        "VIGERO",
        "VIRGO",
        "VIRGO2",
        "VIRGO3",
        "VOODOO",
        "VOODOO2",
        "YOSEMITE",
    },
    sport_classics = {
        "ARDENT",
        "BTYPE",
        "BTYPE2",
        "BTYPE3",
        "CASCO",
        "CHEBUREK",
        "CHEETAH2",
        "COQUETTE2",
        "DELUXO",
        "DYNASTY", -- Casino DLC
        "FAGALOA",
        "FELTZER3", -- Stirling GT
        "GT500",
        "INFERNUS2",
        "JB700",
        "JESTER3",
        "MAMBA",
        "MANANA",
        "MICHELLI",
        "MONROE",
        "NEBULA", -- Casino DLC
        "PEYOTE",
        "PIGALLE",
        "RAPIDGT3",
        "RETINUE",
        "SAVESTRA",
        "STINGER",
        "STINGERGT",
        "STROMBERG",
        "SWINGER", -- dlc (mpbattle)
        "TORERO",
        "TORNADO",
        "TORNADO2",
        "TORNADO3",
        "TORNADO4",
        "TORNADO5",
        "TORNADO6",
        "TURISMO2",
        "VISERIS",
        "Z190",
        "ZION3", -- Casino DLC
        "ZTYPE",
    },
    sports = {
        "ALPHA",
        "BANSHEE",
        "BESTIAGTS",
        "BLISTA2",
        "BLISTA3",
        "BUFFALO",
        "BUFFALO2",
        "BUFFALO3",
        "CARBONIZZARE",
        "COMET2",
        "COMET3",
        "COMET4",
        "COMET5",
        "COQUETTE",
        "DRAFTER", -- Casino DLC
        "ELEGY",
        "ELEGY2",
        "FELTZER2",
        "FLASHGT",
        "FUROREGT",
        "FUSILADE",
        "FUTO",
        "GB200",
        "HOTRING",
        "ISSI7", -- Casino DLC
        "ITALIGTO", -- MPCHRISTMAS2018 DLC
        "JESTER",
        "JESTER2",
        "JUGULAR", -- Casino DLC
        "KHAMELION",
        "KURUMA",
        "KURUMA2",
        "LOCUST", -- Casino DLC
        "LYNX",
        "MASSACRO",
        "MASSACRO2",
        "NEO", -- Casino DLC
        "NEON", -- Doomsday Heist Update
        "NINEF",
        "NINEF2",
        "OMNIS",
        "PARAGON", -- Casino DLC
        "PARAGON2", -- Casino DLC
        "PARIAH",
        "PENUMBRA",
        "RAIDEN",
        "RAPIDGT",
        "RAPIDGT2",
        "RAPTOR",
        "REVOLTER",
        "RUSTON",
        "SCHAFTER2",
        "SCHAFTER3",
        "SCHAFTER4",
        "SCHAFTER5",
        "SCHLAGEN", -- MPCHRISTMAS2018 DLC
        "SCHWARZER",
        "SENTINEL3",
        "SEVEN70",
        "SPECTER",
        "SPECTER2",
        "SULTAN",
        "SURANO",
        "TAMPA2",
        "TROPOS",
        "VERLIERER2",
        "ZR380", -- MPCHRISTMAS2018 DLC
        "ZR3802", -- MPCHRISTMAS2018 DLC
        "ZR3803", -- MPCHRISTMAS2018 DLC
    },
    super = {
        "ADDER",
        "AUTARCH",
        "BANSHEE2",
        "BULLET",
        "CHEETAH",
        "CYCLONE",
        "DEVESTE", -- MPCHRISTMAS2018 DLC
        "EMERUS", -- Casino DLC
        "ENTITYXF",
        "ENTITY2",
        "FMJ",
        "GP1",
        "INFERNUS",
        "ITALIGTB",
        "ITALIGTB2",
        "KRIEGER", -- Casino DLC
        "LE7B",
        "NERO",
        "NERO2",
        "OSIRIS",
        "PENETRATOR",
        "PFISTER811",
        "PROTOTIPO",
        "REAPER",
        "S80", -- Casino DLC
        "SC1",
        "SCRAMJET", -- dlc (mpbattle)
        "SHEAVA", -- ETR1
        "SULTANRS",
        "T20",
        "TAIPAN",
        "TEMPESTA",
        "TEZERACT",
        "THRAX", -- Casino DLC
        "TURISMOR",
        "TYRANT",
        "TYRUS",
        "VACCA",
        "VAGNER",
        "VIGILANTE",
        "VISIONE",
        "VOLTIC",
        "VOLTIC2",
        "XA21",
        "ZENTORNO",
        "ZORRUSSO", -- Casino DLC
    },
    motorcycles = {
        "AKUMA",
        "AVARUS",
        "BAGGER",
        "BATI",
        "BATI2",
        "BF400",
        "CARBONRS",
        "CHIMERA",
        "CLIFFHANGER",
        "DAEMON",
        "DAEMON2",
        "DEFILER",
        "DEATHBIKE", -- MPCHRISTMAS2018 DLC
        "DEATHBIKE2", -- MPCHRISTMAS2018 DLC
        "DEATHBIKE3", -- MPCHRISTMAS2018 DLC
        "DIABLOUS",
        "DIABLOUS2",
        "DOUBLE",
        "ENDURO",
        "ESSKEY",
        "FAGGIO",
        "FAGGIO2",
        "FAGGIO3",
        "FCR",
        "FCR2",
        "GARGOYLE",
        "HAKUCHOU",
        "HAKUCHOU2",
        "HEXER",
        "INNOVATION",
        "LECTRO",
        "MANCHEZ",
        "NEMESIS",
        "NIGHTBLADE",
        "OPPRESSOR",
        "OPPRESSOR2", -- dlc (mpbattle)
        "PCJ",
        "RATBIKE",
        "RROCKET", -- Casino DLC
        "RUFFIAN",
        "SANCHEZ",
        "SANCHEZ2",
        "SANCTUS",
        "SHOTARO",
        "SOVEREIGN",
        "THRUST",
        "VADER",
        "VINDICATOR",
        "VORTEX",
        "WOLFSBANE",
        "ZOMBIEA",
        "ZOMBIEB",
    },
    offroad = {
        "BFINJECTION",
        "BIFTA",
        "BLAZER",
        "BLAZER2",
        "BLAZER3",
        "BLAZER4",
        "BLAZER5",
        "BODHI2",
        "BRAWLER",
        "BRUISER", -- MPCHRISTMAS2018 DLC
        "BRUISER2", -- MPCHRISTMAS2018 DLC
        "BRUISER3", -- MPCHRISTMAS2018 DLC
        "BRUTUS", -- MPCHRISTMAS2018 DLC
        "BRUTUS2", -- MPCHRISTMAS2018 DLC
        "BRUTUS3", -- MPCHRISTMAS2018 DLC
        "CARACARA",
        "CARACARA2", -- Casino DLC
        "DLOADER",
        "DUBSTA3",
        "DUNE",
        "DUNE2",
        "DUNE3",
        "DUNE4",
        "DUNE5",
        "FREECRAWLER", -- dlc (mpbattle)
        "HELLION", -- Casino DLC
        "INSURGENT",
        "INSURGENT2",
        "INSURGENT3",
        "KALAHARI",
        "KAMACHO",
        "MARSHALL",
        "MENACER", -- dlc (mpbattle)
        "MESA3",
        "MONSTER",
        "MONSTER3", -- MPCHRISTMAS2018 DLC
        "MONSTER4", -- MPCHRISTMAS2018 DLC
        "MONSTER5", -- MPCHRISTMAS2018 DLC
        "NIGHTSHARK",
        "RANCHERXL",
        "RANCHERXL2",
        "RCBANDITO", -- MPCHRISTMAS2018 DLC
        "REBEL",
        "REBEL2",
        "RIATA",
        "SANDKING",
        "SANDKING2",
        "TECHNICAL",
        "TECHNICAL2",
        "TECHNICAL3",
        "TROPHYTRUCK",
        "TROPHYTRUCK2",
    },
    industrial = {
        "BULLDOZER",
        "CUTTER",
        "DUMP",
        "FLATBED",
        "GUARDIAN",
        "HANDLER",
        "MIXER",
        "MIXER2",
        "RUBBLE",
        "TIPTRUCK",
        "TIPTRUCK2",
    },
    utility = {
        "AIRTUG",
        "CADDY",
        "CADDY2",
        "CADDY3",
        "DOCKTUG",
        "FORKLIFT",
        "TRACTOR2", -- Fieldmaster
        "TRACTOR3", -- Fieldmaster
        "MOWER", -- Lawnmower
        "RIPLEY",
        "SADLER",
        "SADLER2",
        "SCRAP",
        "TOWTRUCK",
        "TOWTRUCK2",
        "TRACTOR", -- Tractor (rusted/old)
        "UTILLITRUCK",
        "UTILLITRUCK2",
        "UTILLITRUCK3",

        --/ Trailers

        --/ Army Trailers
        "ARMYTRAILER", -- Military
        "ARMYTRAILER2", -- Civillian
        "FREIGHTTRAILER", -- Extended
        "ARMYTANKER", -- Army Tanker
        "TRAILERLARGE", -- Mobile Operations Center
    
        --/ Large Trailers
        "DOCKTRAILER", -- Shipping Container Trailer
        "TR3", -- Large Boat Trailer (Sailboat)
        "TR2", -- Large Vehicle Trailer
        "TR4", -- Large Vehicle Trailer (Mission Cars)
        "TRFLAT", -- Large Flatbed Empty Trailer
        "TRAILERS", -- Container/Curtain Trailer
        "TRAILERS4", -- White Container Trailer
        "TRAILERS2", -- Box Trailer
        "TRAILERS3", -- Ramp Box Trailer
        "TVTRAILER", -- Fame or Shame Trailer
        "TRAILERLOGS", -- Logs Trailer
        "TANKER", -- Ron Oil Tanker Trailer
        "TANKER2", -- Ron Oil Tanker Trailer (Heist Version)
    
        --/ Medium Trailers
        "BALETRAILER", -- (Tractor Hay Bale Trailer)
        "GRAINTRAILER", -- (Tractor Grain Trailer)
    
        -- Ortega's trailer, we don't want this one because you can't drive them.
        --"PROPTRAILER",
        --/ Small Trailers
        "BOATTRAILER", -- Small Boat Trailer
        "RAKETRAILER", -- Tractor Tow Plow/Rake
        "TRAILERSMALL", -- Small Utility Trailer
    },
    vans = {
        "BISON",
        "BISON2",
        "BISON3",
        "BOBCATXL",
        "BOXVILLE",
        "BOXVILLE2",
        "BOXVILLE3",
        "BOXVILLE4",
        "BOXVILLE5",
        "BURRITO",
        "BURRITO2",
        "BURRITO3",
        "BURRITO4",
        "BURRITO5",
        "CAMPER",
        "GBURRITO",
        "GBURRITO2",
        "JOURNEY",
        "MINIVAN",
        "MINIVAN2",
        "PARADISE",
        "PONY",
        "PONY2",
        "RUMPO",
        "RUMPO2",
        "RUMPO3",
        "SPEEDO",
        "SPEEDO2",
        "SPEEDO4", -- dlc (mpbattle)
        "SURFER",
        "SURFER2",
        "TACO",
        "YOUGA",
        "YOUGA2",
    },
    cycles = {
        "BMX",
        "CRUISER",
        "FIXTER",
        "SCORCHER",
        "TRIBIKE",
        "TRIBIKE2",
        "TRIBIKE3",
    },
    boats = {
        "DINGHY",
        "DINGHY2",
        "DINGHY3",
        "DINGHY4",
        "JETMAX",
        "MARQUIS",
        "PREDATOR",
        "SEASHARK",
        "SEASHARK2",
        "SEASHARK3",
        "SPEEDER",
        "SPEEDER2",
        "SQUALO",
        "SUBMERSIBLE",
        "SUBMERSIBLE2",
        "SUNTRAP",
        "TORO",
        "TORO2",
        "TROPIC",
        "TROPIC2",
        "TUG",
    },
    helicopters = {
        "AKULA",
        "ANNIHILATOR",
        "BUZZARD",
        "BUZZARD2",
        "CARGOBOB",
        "CARGOBOB2",
        "CARGOBOB3",
        "CARGOBOB4",
        "FROGGER",
        "FROGGER2",
        "HAVOK",
        "HUNTER",
        "MAVERICK",
        "POLMAV",
        "SAVAGE",
        "SEASPARROW",
        "SKYLIFT",
        "SUPERVOLITO",
        "SUPERVOLITO2",
        "SWIFT",
        "SWIFT2",
        "VALKYRIE",
        "VALKYRIE2",
        "VOLATUS",
    },
    planes = {
        "ALPHAZ1",
        "AVENGER",
        "AVENGER2",
        "BESRA",
        "BLIMP",
        "BLIMP2",
        "BLIMP3", -- dlc (mpbattle)
        "BOMBUSHKA",
        "CARGOPLANE",
        "CUBAN800",
        "DODO",
        "DUSTER",
        "HOWARD",
        "HYDRA",
        "JET",
        "LAZER",
        "LUXOR",
        "LUXOR2",
        "MAMMATUS",
        "MICROLIGHT",
        "MILJET",
        "MOGUL",
        "MOLOTOK",
        "NIMBUS",
        "NOKOTA",
        "PYRO",
        "ROGUE",
        "SEABREEZE",
        "SHAMAL",
        "STARLING",
        "STRIKEFORCE", -- dlc (mpbattle)
        "STUNT",
        "TITAN",
        "TULA",
        "VELUM",
        "VELUM2",
        "VESTRA",
        "VOLATOL",
    },
    service = {
        "AIRBUS",
        "BRICKADE",
        "BUS",
        "COACH",
        "PBUS2", -- dlc (mpbattle)
        "RALLYTRUCK",
        "RENTALBUS",
        "TAXI",
        "TOURBUS",
        "TRASH",
        "TRASH2",
        "WASTELANDER",
    },
    emergency = {
        "AMBULANCE",
        "FBI",
        "FBI2",
        "FIRETRUK",
        "LGUARD",
        "PBUS",
        "POLICE",
        "POLICE2",
        "POLICE3",
        "POLICE4",
        "POLICEB",
        "POLICEOLD1",
        "POLICEOLD2",
        "POLICET",
        "POLMAV",
        "PRANGER",
        "PREDATOR",
        "RIOT",
        "RIOT2",
        "SHERIFF",
        "SHERIFF2",
    },
    military = {
        "APC",
        "BARRACKS",
        "BARRACKS2",
        "BARRACKS3",
        "BARRAGE",
        "CHERNOBOG",
        "CRUSADER",
        "HALFTRACK",
        "KHANJALI",
        "RHINO",
        "SCARAB", -- MPCHRISTMAS2018 DLC
        "SCARAB2", -- MPCHRISTMAS2018 DLC
        "SCARAB3", -- MPCHRISTMAS2018 DLC
        "THRUSTER", -- Jetpack
        "TRAILERSMALL2", -- Anti Aircraft Trailer
    },
    commercial = {
        "BENSON",
        "BIFF",
        "CERBERUS", -- MPCHRISTMAS2018 DLC
        "CERBERUS2", -- MPCHRISTMAS2018 DLC
        "CERBERUS3", -- MPCHRISTMAS2018 DLC
        "HAULER",
        "HAULER2",
        "MULE",
        "MULE2",
        "MULE3",
        "MULE4", -- dlc (mpbattle)
        "PACKER",
        "PHANTOM",
        "PHANTOM2",
        "PHANTOM3",
        "POUNDER",
        "POUNDER2", -- dlc (mpbattle)
        "STOCKADE",
        "STOCKADE3",
        "TERBYTE", -- dlc (mpbattle)
    },
    trains = {
        "CABLECAR",
        "FREIGHT",
        "FREIGHTCAR",
        "FREIGHTCONT1",
        "FREIGHTCONT2",
        "FREIGHTGRAIN",
        "METROTRAIN",
        "TANKERCAR",
    },
}

--[[
-- FOR CLASSES
    Compacts = 0,
    Sedans = 1,
    SUVs = 2,
    Coupes = 3,
    Muscle = 4,
    SportsClassics = 5,
    Sports = 6,
    Super = 7,
    Motorcycles = 8,
    OffRoad = 9,
    Industrial = 10,
    Utility = 11,
    Vans = 12,
    Cycles = 13,
    Boats = 14,
    Helicopters = 15,
    Planes = 16,
    Service = 17,
    Emergency = 18,
    Military = 19,
    Commercial = 20,
    Trains = 21
]]