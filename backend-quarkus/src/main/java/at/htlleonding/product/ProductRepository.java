package at.htlleonding.product;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {

    @Inject
    EntityManager entityManager;

    public Object getProductByName(String name) {
        return find("name", name).firstResult();
    }
    public Product getProductByNameForPricelist(String name) {
        return find("name", name).firstResult();
    }


}
