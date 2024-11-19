#### Mems and Front Stack and features
React,  TypeScript, NextJS, Tailwind, Mongo (mongoose) , zod (server validation)
* features:
   * hook on external redirect
   * hover with tailwind css
   * upload images to the db
   * navigation links
   * next-auth for upload mems
   * todo
   * pagination
   * search
   * i8n

#### Music Stack and features 
Kotlin ktor SQL_DB

#### Movies Stack and features
Java, REST API, Spring, PostgreSQL
* features:
   * FlyWay for migration
   * Spring JPA 
   * 
   * todo 
   * scala functions usage
   * GraphQL
   * i8n
   * security SB
   * MAYBE:
     * jooq (but now JPA is used)
     * vaadin (I have a FE on NextJS)
     * login with IDP Github

#### Games Stack and features
3) Go (Games)

4) local http server (node)
  to share local images via http server

## !INFO BELOW FOR DEVELOPER ONLY!
To run the project:

install DB
docker postgres 17.0
exec
su - postgres
psql
CREATE ROLE fstck_user with login SUPERUSER PASSWORD 'fstck_secret';

#### vol backup

1)copy dump with all data on it
docker exec -t <container_name> pg_dumpall -c -U <db_user> > /path/to/dump.sql
2) copy dump file dump.sql to the new place

3) for recover
cat /path/to/dump.sql | docker exec -i <container_name> psql -U <db_user>

another-1)
create a archive with volume data
docker run --rm -v <volume_name>:/volume -v $(pwd):/backup busybox tar czf /backup/volume_backup.tar.gz -C /volume .
another-2)
copy to the another place 
docker run --rm -v <volume_name>:/volume -v $(pwd):/backup busybox sh -c "cd /volume && tar xzf /backup/volume_backup.tar.gz"
