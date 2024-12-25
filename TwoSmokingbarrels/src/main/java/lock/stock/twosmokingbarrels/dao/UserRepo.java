package lock.stock.twosmokingbarrels.dao;

import lock.stock.twosmokingbarrels.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    /*UserEntity createByUsernameAndPassword(String username, String password);*/ //todo delete that method and
    //todo  use .save(UserEntity) from service. this is only allowed to use GET operations

    UserEntity findByUsername(String name);
}
