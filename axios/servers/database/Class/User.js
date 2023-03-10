
// La classe User représente un utilisateur avec un UUID unique et une licence
class User extends Game {
    constructor(uuid, licence, skin = {}, outfits = []) {
        // Initialise les propriétés uuid, licence et money
        super()
        this.uuid = uuid;
        this.licence = licence;
        this.money = new Money();
        this.inventory = new Inventory("user", this);
        this.outfit = new Outfit(this, outfits);
        this.vehicles = {};
        this.skin = skin;
        this.jobs = [];
        this.nom = null;
        this.prenom = null;
        this.date_de_naissance = null;
        this.taille = null;
        this.coords = null;
    }


    save(type = "general") {
        if (type === "general") {
            MySQL.fetchScalar(`UPDATE users SET skin = @skin, coords = @coords, cash = @cash, bank = @bank, nom = @nom, prenom = @prenom, taille = @taille, date_de_naissance = @date_de_naissance WHERE uuid = @uuid`, {
                '@bank': this.money.get('bank'),
                '@cash': this.money.get('cash'),
                '@uuid': this.uuid,
                '@nom': this.nom,
                '@prenom': this.prenom,
                '@coords': JSON.stringify(this.coords),
                '@taille': this.taille,
                '@skin': JSON.stringify(this.skin),
                '@date_de_naissance': this.date_de_naissance
            });
        }

    }

}
