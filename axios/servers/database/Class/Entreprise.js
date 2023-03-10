
class Entreprise {
    constructor(name, owner_uuid) {
        this.money = new Money();
        this.name = name;
        this.owner = owner_uuid;
        this.roles = [];
        this.members = {}
    }


}