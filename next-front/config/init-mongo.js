db = db.getSiblingDB('mem_db');

db.createUser(
    {
        user: "mem_user",
        pwd: "mem_secret",
        roles: [
            {
                role: "readWrite",
                db: "mem_db"
            }
        ]
    }
);

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
