const GetVehicleProperties = (vehicle) => {
    let [color1, color2] = GetVehicleColours(vehicle);
    let [pearlescentColor, wheelColor] = GetVehicleExtraColours(vehicle);
    let extras = {};
    for (let id = 0; id <= 12; id++) {
        if (DoesExtraExist(vehicle, id)) {
            let state = IsVehicleExtraTurnedOn(vehicle, id) == 1;
            extras[id.toString()] = state;
        }
    }

    return {
        model: GetEntityModel(vehicle),
        plate: GetVehicleNumberPlateText(vehicle),
        plateIndex: GetVehicleNumberPlateTextIndex(vehicle),
        health: GetEntityHealth(vehicle),
        dirtLevel: GetVehicleDirtLevel(vehicle),
        speedModifier: GetVehicleTopSpeedModifier(vehicle),
        color1: color1,
        color2: color2,
        pearlescentColor: pearlescentColor,
        wheelColor: wheelColor,
        wheels: GetVehicleWheelType(vehicle),
        windowTint: GetVehicleWindowTint(vehicle),
        neonEnabled: [
            IsVehicleNeonLightEnabled(vehicle, 0),
            IsVehicleNeonLightEnabled(vehicle, 1),
            IsVehicleNeonLightEnabled(vehicle, 2),
            IsVehicleNeonLightEnabled(vehicle, 3)
        ],
        extras: extras,
        neonColor: GetVehicleNeonLightsColour(vehicle),
        tyreSmokeColor: GetVehicleTyreSmokeColor(vehicle),
        modSpoilers: GetVehicleMod(vehicle, 0),
        modFrontBumper: GetVehicleMod(vehicle, 1),
        modRearBumper: GetVehicleMod(vehicle, 2),
        modSideSkirt: GetVehicleMod(vehicle, 3),
        modExhaust: GetVehicleMod(vehicle, 4),
        modFrame: GetVehicleMod(vehicle, 5),
        modGrille: GetVehicleMod(vehicle, 6),
        modHood: GetVehicleMod(vehicle, 7),
        modFender: GetVehicleMod(vehicle, 8),
        modRightFender: GetVehicleMod(vehicle, 9),
        modRoof: GetVehicleMod(vehicle, 10),
        modEngine: GetVehicleMod(vehicle, 11),
        modBrakes: GetVehicleMod(vehicle, 12),
        modTransmission: GetVehicleMod(vehicle, 13),
        modHorns: GetVehicleMod(vehicle, 14),
        modSuspension: GetVehicleMod(vehicle, 15),
        modArmor: GetVehicleMod(vehicle, 16),
        modTurbo: IsToggleModOn(vehicle, 18),
        modSmokeEnabled: IsToggleModOn(vehicle, 20),
        modXenon: IsToggleModOn(vehicle, 22),
        modFrontWheels: GetVehicleMod(vehicle, 23),
        modBackWheels: GetVehicleMod(vehicle, 24),
        modPlateHolder: GetVehicleMod(vehicle, 25),
        modVanityPlate: GetVehicleMod(vehicle, 26),
        modTrimA: GetVehicleMod(vehicle, 27),
        modOrnaments: GetVehicleMod(vehicle, 28),
        modDashboard: GetVehicleMod(vehicle, 29),
        modDial: GetVehicleMod(vehicle, 30),
        modDoorSpeaker: GetVehicleMod(vehicle, 31),
        modSeats: GetVehicleMod(vehicle, 32),
        modSteeringWheel: GetVehicleMod(vehicle, 33),
        modShifterLeavers: GetVehicleMod(vehicle, 34),
        modAPlate: GetVehicleMod(vehicle, 35),
        modSpeakers: GetVehicleMod(vehicle, 36),
        modTrunk: GetVehicleMod(vehicle, 37),
        modHydrolic: GetVehicleMod(vehicle, 38),
        modEngineBlock: GetVehicleMod(vehicle, 39),
        modAirFilter: GetVehicleMod(vehicle, 40),
        modStruts: GetVehicleMod(vehicle, 41),
        modArchCover: GetVehicleMod(vehicle, 42),
        modAerials: GetVehicleMod(vehicle, 43),
        modTrimB: GetVehicleMod(vehicle, 44),
        modTank: GetVehicleMod(vehicle, 45),
        modWindows: GetVehicleMod(vehicle, 46),
        modLivery: GetVehicleLivery(vehicle)
    }
}


const SetVehicleProperties = (vehicle, props) => {

    SetVehicleModKit(vehicle, 0);

    if (props.plate !== undefined) {
        SetVehicleNumberPlateText(vehicle, props.plate);
    }

    if (props.plateIndex !== undefined) {
        SetVehicleNumberPlateTextIndex(vehicle, props.plateIndex);
    }

    if (props.health !== undefined) {
        SetEntityHealth(vehicle, props.health);
    }

    if (props.dirtLevel !== undefined) {
        SetVehicleDirtLevel(vehicle, props.dirtLevel);
    }

    if (props.color1 !== undefined || props.color2 !== undefined) {
        let [color1, color2] = GetVehicleColours(vehicle);
        if (props.color1 !== undefined) {
            color1 = props.color1;
        }
        if (props.color2 !== undefined) {
            color2 = props.color2;
        }
        SetVehicleColours(vehicle, color1, color2);
    }

    if (props.pearlescentColor !== undefined || props.wheelColor !== undefined) {
        let [pearlescentColor, wheelColor] = GetVehicleExtraColours(vehicle);
        if (props.pearlescentColor !== undefined) {
            pearlescentColor = props.pearlescentColor;
        }
        if (props.wheelColor !== undefined) {
            wheelColor = props.wheelColor;
        }
        SetVehicleExtraColours(vehicle, pearlescentColor, wheelColor);
    }

    if (props.wheels !== undefined) {
        SetVehicleWheelType(vehicle, props.wheels);
    }

    if (props.windowTint !== undefined) {
        SetVehicleWindowTint(vehicle, props.windowTint);
    }

    if (props.neonEnabled !== undefined) {
        for (let i = 0; i < 4; i++) {
            const enabled = props.neonEnabled[i];
            SetVehicleNeonLightEnabled(vehicle, i, enabled);
        }
    }

    if (props.extras !== undefined) {
        for (let id in props.extras) {
            const enabled = props.extras[id];
            SetVehicleExtra(vehicle, parseInt(id), enabled ? 0 : 1);
        }
    }

    if (props.neonColor !== undefined) {
        const [r, g, b] = props.neonColor;
        SetVehicleNeonLightsColour(vehicle, r, g, b);
    }

    if (props.modSmokeEnabled !== undefined) {
        ToggleVehicleMod(vehicle, 20, true);
    }

    if (props.speedModifier !== undefined) {
        ModifyVehicleTopSpeed(vehicle, props.speedModifier);
    }

    if (props.tyreSmokeColor !== undefined) {
        const [r, g, b] = props.tyreSmokeColor;
        SetVehicleTyreSmokeColor(vehicle, r, g, b);
    }

    if (props.modSpoilers !== undefined) {
        SetVehicleMod(vehicle, 0, props.modSpoilers, false);
    }

    if (props.modFrontBumper !== undefined) {
        SetVehicleMod(vehicle, 1, props.modFrontBumper, false);
    }

    if (props.modRearBumper !== undefined) {
        SetVehicleMod(vehicle, 2, props.modRearBumper, false);
    }

    if (props.modSideSkirt !== undefined) {
        SetVehicleMod(vehicle, 3, props.modSideSkirt, false);
    }

    if (props.modExhaust !== undefined) {
        SetVehicleMod(vehicle, 4, props.modExhaust, false);
    }

    if (props.modFrame !== undefined) {
        SetVehicleMod(vehicle, 5, props.modFrame, false);
    }

    if (props.modGrille !== undefined) {
        SetVehicleMod(vehicle, 6, props.modGrille, false);
    }

    if (props.modHood !== undefined) {
        SetVehicleMod(vehicle, 7, props.modHood, false);
    }

    if (props.modFender !== undefined) {
        SetVehicleMod(vehicle, 8, props.modFender, false);
    }

    if (props.modRightFender !== undefined) {
        SetVehicleMod(vehicle, 9, props.modRightFender, false);
    }

    if (props.modRoof !== undefined) {
        SetVehicleMod(vehicle, 10, props.modRoof, false);
    }

    if (props.modEngine !== undefined) {
        SetVehicleMod(vehicle, 11, props.modEngine, false);
    }

    if (props.modBrakes !== undefined) {
        SetVehicleMod(vehicle, 12, props.modBrakes, false);
    }

    if (props.modTransmission !== undefined) {
        SetVehicleMod(vehicle, 13, props.modTransmission, false);
    }

    if (props.modHorns !== undefined) {
        SetVehicleMod(vehicle, 14, props.modHorns, false);
    }

    if (props.modSuspension !== undefined) {
        SetVehicleMod(vehicle, 15, props.modSuspension, false);
    }

    if (props.modArmor !== undefined) {
        SetVehicleMod(vehicle, 16, props.modArmor, false);
    }

    if (props.modTurbo !== undefined) {
        ToggleVehicleMod(vehicle, 18, props.modTurbo);
    }

    if (props.modXenon !== undefined) {
        ToggleVehicleMod(vehicle, 22, props.modXenon);
    }

    if (props.modFrontWheels !== undefined) {
        SetVehicleMod(vehicle, 23, props.modFrontWheels, false);
    }

    if (props.modBackWheels !== undefined) {
        SetVehicleMod(vehicle, 24, props.modBackWheels, false);
    }

    if (props.modPlateHolder !== undefined) {
        SetVehicleMod(vehicle, 25, props.modPlateHolder, false);
    }

    if (props.modVanityPlate !== undefined) {
        SetVehicleMod(vehicle, 26, props.modVanityPlate, false);
    }

    if (props.modTrimA !== undefined) {
        SetVehicleMod(vehicle, 27, props.modTrimA, false);
    }

    if (props.modOrnaments !== undefined) {
        SetVehicleMod(vehicle, 28, props.modOrnaments, false);
    }

    if (props.modDashboard !== undefined) {
        SetVehicleMod(vehicle, 29, props.modDashboard, false);
    }

    if (props.modDial !== undefined) {
        SetVehicleMod(vehicle, 30, props.modDial, false);
    }

    if (props.modDoorSpeaker !== undefined) {
        SetVehicleMod(vehicle, 31, props.modDoorSpeaker, false);
    }

    if (props.modSeats !== undefined) {
        SetVehicleMod(vehicle, 32, props.modSeats, false);
    }

    if (props.modSteeringWheel !== undefined) {
        SetVehicleMod(vehicle, 33, props.modSteeringWheel, false);
    }

    if (props.modShifterLeavers !== undefined) {
        SetVehicleMod(vehicle, 34, props.modShifterLeavers, false);
    }

    if (props.modAPlate !== undefined) {
        SetVehicleMod(vehicle, 35, props.modAPlate, false);
    }

    if (props.modSpeakers != undefined) {
        SetVehicleMod(vehicle, 36, props.modSpeakers, false)
    }

    if (props.modTrunk != undefined) {
        SetVehicleMod(vehicle, 37, props.modTrunk, false)
    }

    if (props.modHydrolic != undefined) {
        SetVehicleMod(vehicle, 38, props.modHydrolic, false)
    }

    if (props.modEngineBlock != undefined) {
        SetVehicleMod(vehicle, 39, props.modEngineBlock, false)
    }

    if (props.modAirFilter != undefined) {
        SetVehicleMod(vehicle, 40, props.modAirFilter, false)
    }

    if (props.modStruts != undefined) {
        SetVehicleMod(vehicle, 41, props.modStruts, false)
    }

    if (props.modArchCover != undefined) {
        SetVehicleMod(vehicle, 42, props.modArchCover, false)
    }

    if (props.modAerials != undefined) {
        SetVehicleMod(vehicle, 43, props.modAerials, false)
    }

    if (props.modTrimB != undefined) {
        SetVehicleMod(vehicle, 44, props.modTrimB, false)
    }

    if (props.modTank != undefined) {
        SetVehicleMod(vehicle, 45, props.modTank, false)
    }

    if (props.modWindows != undefined) {
        SetVehicleMod(vehicle, 46, props.modWindows, false)
    }

    if (props.modLivery != undefined) {
        SetVehicleMod(vehicle, 48, props.modLivery, false)
        SetVehicleLivery(vehicle, props.modLivery)
    }
}
