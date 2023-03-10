
class Outfit {

    constructor(user, outfits = []) {
        this.user = user;
        this.activated = null;

        this.outfits = {};
        for (let i = 0; i < outfits.length; i++) {
            const value = outfits[i];
            if (value.active)
                this.activated = value.idx;
            this.outfits[value.idx] = value;
            this.outfits[value.idx].outfit = JSON.parse(value.outfit);
        }
    }

    async add(name, outfit) {
        const idx = Object.keys(this.outfits).length;
        await MySQL.fetchScalar(`INSERT INTO outfits(uuid, idx, name, outfit) VALUES(@uuid, @idx,  @name, @outfit)`, {
            '@uuid': this.user.uuid,
            '@idx': idx,
            '@name': name,
            '@outfit': JSON.stringify(outfit),
        });
        this.outfits[idx] = { name, outfit, idx };

        this.active(idx);
    }

    getActive = () => {
        if (!this.outfits[this.activated]) return null;
        return this.outfits[this.activated];
    }

    active(idx) {
        if (!this.outfits[idx]) return;
        MySQL.fetchScalar(`UPDATE outfits SET active = 0 WHERE uuid = @uuid`, {
            '@uuid': this.user.uuid,
        });
        MySQL.fetchScalar(`UPDATE outfits SET active = 1 WHERE uuid = @uuid AND idx = @idx`, {
            '@uuid': this.user.uuid,
            '@idx': idx,
        });
        this.activated = idx;
    }

    remove(idx) {
        if (!this.outfits[idx]) return;

        MySQL.fetchScalar(`DELETE FROM outfit WHERE uuid = @uuid AND idx = @idx`, {
            '@uuid': this.user.uuid,
            '@idx': idx,
        });
    }
}