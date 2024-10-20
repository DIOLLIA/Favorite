## Postgres DB on docker container with volume 

### to copy volume
bash:
`docker run --rm -v fstck-vol:/fstck-vol -v $(pwd):/backup busybox tar czf /backup/volume_backup.tar.gz -C /fstck-vol .`
pshll:
`docker run --rm -v fstck-vol:/fstck-vol -v ${PWD}:/backup busybox tar czf /backup/volume_backup.tar.gz -C /fstck-vol .`
cmd:
`docker run --rm -v fstck-vol:/fstck-vol -v %cd%:/backup busybox tar czf /backup/volume_backup.tar.gz -C /fstck-vol .`

to bring the volume at position:
`docker run --rm -v fstck-vol:/fstck-vol -v $(pwd):/backup busybox sh -c "cd /fstck-vol && tar xzf /backup/volume_backup.tar.gz"`

### to run postgres db:
`docker-compose -f .\.docker\docker-compose-local.yaml up`

* pwd (print working directory)