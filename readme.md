#### Mems and Front Stack
React,  TypeScript, NextJS, Tailwind, Mongo (mongoose) 
* features:
   * hook on external redirect
   * hover with tailwind css
   * upload images to the db
   * navigation links
   * todo pagination
   * todo search
   * todo auth for admin upload

1) Kotlin ktor SQL_DB (Music)

2) Java Spring  JOOQ, Vaadin (Movies)

3) Go (Games)

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
