db = db.getSiblingDB('meme_db');

db.createCollection('mems_');

db.mems_.insertMany([
    {
        name: "Cat_yeyks_food",
        image: "mem_cat_1.jpeg",
        description: "Popular"
    },
    {
        name: "Cute duck",
        image: "mem_duck_1.jpg",
        description: "Kryak"
    }
]);
