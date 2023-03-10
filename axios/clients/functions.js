


let skin = {};
let outfits = {};
let skin_withoutsave = {}

let categories = {
    "sex": { name: "Sexe" },
    'face': { name: "Visage" },
    "skin": { name: "Peau" },
    "age_1": { name: "Rides" },
    "age_2": { name: "Epaisseur de rides" },
    "beard_1": { name: "Type de barbe" },
    "beard_2": { name: "Taille de barbe" },
    "beard_3": { name: "Couleur de barbe 1" },
    "beard_4": { name: "Couleur de barbe 2" },
    "hair_1": { name: "Cheveux 1" },
    "hair_2": { name: "Cheveux 2" },
    "hair_color_1": { name: "Couleur de cheveux 1" },
    "hair_color_2": { name: "Couleur de cheveux 2" },
    "eyebrows_1": { name: "Type de sourcils" },
    "eyebrows_2": { name: "Taille de sourcils" },
    "eyebrows_3": { name: "Couleur de cheveux 1" },
    "eyebrows_4": { name: "Couleur de cheveux 2" },
    "makeup_1": { name: "Type de maquillage" },
    "makeup_2": { name: "Epaisseur de maquillage" },
    "lipstick_1": { name: "Rouge à lèvres" },
    "lipstick_2": { name: "Epaisseur à lèvres" },
    "ears_1": { name: "Accessoire oreilles" },
    "ears_2": { name: "Couleur accessoire" },
    "tshirt_1": { name: "Type de Tshirt" },
    "tshirt_2": { name: "Couleur du Tshirt" },
    "torso_1": { name: "Type de torse" },
    "torso_2": { name: "Couleur de torse" },
    "decals_1": { name: "Calque 1" },
    "decals_2": { name: "Calque 2" },
    "arms": { name: "Bras" },
    "pants_1": { name: "Type de Pantalon" },
    "pants_2": { name: "Couleur de Pantalon" },
    "shoes_1": { name: "Type de chaussures" },
    "shoes_2": { name: "Couleur de chaussures" },
    "chain_1": { name: "Type de chaine" },
    "chain_2": { name: "Couleur de chaine" },
    "helmet_1": { name: "Type de Casque" },
    "helmet_2": { name: "Couleur de casque" },
    "glasses_1": { name: "Type de lunette" },
    "glasses_2": { name: "Couleur de lunette" },
    "bags_1": { name: "Sac" },
    "bags_2": { name: "Couleur du Sac" }
}


const reloadSkin = (cb) => {
    emit('skinchanger:getData', async (components, maxVals) => {
        for (let i = 0; i < components.length; i++) {
            const c = components[i];
            skin[c.name] = c.value;
            if (categories[c.name]) {
                console.log(c);
                categories[c.name].min = c.min;
                categories[c.name].value = c.value;
                categories[c.name].max = maxVals[c.name];
                if (c.name == "sex")
                    categories[c.name].max = 1;

            }

        }
        cb();
    });

    emitNet('clothes:outfits');
}

onNet('clothes:outfitsCallback', (outfits_list) => {
    outfits = outfits_list
})

onNet('set', (key, value) => {
    console.log(key, "define");
    Profiler[key] = value;
})

onNet('setInventory', (key, value) => {
    if (!Profiler.inventory) Profiler.inventory = {};
    console.log(`Item.${key} OK`)
    Profiler.inventory[key] = value;
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

