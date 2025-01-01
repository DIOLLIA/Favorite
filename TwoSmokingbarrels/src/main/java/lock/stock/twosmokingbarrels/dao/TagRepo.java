package lock.stock.twosmokingbarrels.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lock.stock.twosmokingbarrels.entity.TagEntity;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public class TagRepo {

    @PersistenceContext
    private EntityManager entityManager;

    //TagEntity findByName(String name);
    @SuppressWarnings("unchecked")
    public Set<TagEntity> findByNames(String condition) {
        String sql = "SELECT * FROM tags WHERE name IN (" + condition + ")";
        var resultlist = entityManager.createNativeQuery(sql, TagEntity.class).getResultList();
        return Set.copyOf(resultlist);
    }
}

