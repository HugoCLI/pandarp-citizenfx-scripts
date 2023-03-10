
class Game {

    teleport(coords) {
        // Si il manque soit x, soit y, soit z
        if (coords.length < 3) return;
        if (!this.ped) return;


        SetEntityCoords(this.ped, coords[0], coords[1], coords[2])

        if (coords[3]) // heading
        {
            emitNet('SetGameplayCamRelativeHeading', this.id, coords[3])
            SetEntityHeading(this.ped, coords[3]);
        }
    }

}