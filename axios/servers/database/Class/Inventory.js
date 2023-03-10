
class Inventory {

    constructor(type, data) {
        this.inventory = {}
        this.type = type;
        this.data = data;
    }

    init(name, count) {
        this.inventory[name] = items[name];
        this.inventory[name].count = count;
        console.log(`Initialised x${count} ${name}`)
    }

    add(name, count) {
        if (!items[name])
            return false;

        console.log(`Added x${count} ${name}`)
        if (this.inventory[name]) {
            this.inventory[name].count += count;
        }
        else {
            this.inventory[name] = items[name];
            this.inventory[name].count = count;
            this.inventory[name].row_init = true;
        }
        this.save(name);
    }

    remove(name, count) {
        if (!this.inventory[name])
            return false;
        if (this.inventory[name].count >= count) {
            this.inventory[name].count -= count;
            console.log(`Removed x${count} ${name}`)
            this.save(name);
            return true;
        }
        console.log(`Error Removed x${count} ${name}`)
        return false;
    }

    has(name, count) {
        if (!this.inventory[name]) return false;
        if (this.inventory[name].count >= count) return true;
        return false;
    }


    get(name) {
        if (!this.inventory[name]) return 0;
        return this.inventory[name].count;
    }

    save(item_name) {
        let item = items[item_name];
        if (this.type === "user") {
            if (item.row_init)
                MySQL.fetchScalar(`INSERT INTO inventory(uuid, name, count) VALUES('${this.data.uuid}', '${item_name}', ${item.count})`, {});
            else
                MySQL.fetchScalar(`UPDATE inventory SET count = ${item.count} WHERE uuid = '${this.data.uuid}' AND name = '${item_name}'`, {});
            delete item.row_init;
        }
    }

}