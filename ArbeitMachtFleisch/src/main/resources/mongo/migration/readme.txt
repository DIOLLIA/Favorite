To create mongo database use command from exec in container

1) connect to the container-mongosh shell docker exec -it mongomem mongosh -u root_admin -p root_secret --authenticationDatabase admin
2) create DB with command use bands
3) create user to operate with DB

db.createUser({
    user: "bands_user",
    pwd: "bands_secret",
    roles: [{ role: "readWrite", db: "bands" }, {role: "dbAdmin", db: "bands"}]
})

4)check the output
use bands
db.getUsers()
output:> {users :[....]}


About mongo liquibase migration commands
https://docs.liquibase.com/change-types/mongodb/home.html

In Liquibase for MongoDB, data modification operations (like updating documents)
are performed using runCommand, which allows to execute arbitrary MongoDB commands.


* how it was possible to change the column name and add new one:

- changeSet:
....
      changes:
        - runCommand:
            command: |
              {
                update: "bands_data",
                updates: [
                  {
                    q: { "band_data": { "$exists": true } },
                    u: {
                      $rename: { "band_data": "band_description_en" }
                    },
                    multi: true
                  }
                ]
              }
        - runCommand:
            command: |
              {
                update: "bands_data",
                updates: [
                  {
                    q: { "band_description_en": { "$exists": true } },
                    u: {
                      $set: { "band_description_de": "$band_description_en" }
                    },
                    multi: true
                  }
                ]
              }

To create the `music' database, find the SQL script in the root of the project.
