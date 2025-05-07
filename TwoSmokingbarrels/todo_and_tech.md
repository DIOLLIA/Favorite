 * todo
  * Spring Cache
  * scala functions usage
  * GraphQL
  * security SB
  * Spring Boot Actuator
  * Springdoc OpenAPI
  * MAYBE:
    * Spring Data REST
    * login with IDP Github



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



store images on separate server

GraphQL

install DB
docker postgres 17.0
exec
su - postgres
psql
CREATE ROLE fstck_user with login SUPERUSER PASSWORD 'fstck_secret';
