package at.htlleonding.pricelist;

import at.htlleonding.event.EventRepository;
import at.htlleonding.product.Product;
import at.htlleonding.product.ProductRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import javax.xml.namespace.QName;

@ApplicationScoped
public class PricelistRepository implements PanacheRepository<Pricelist> {

    @Inject
    EntityManager entityManager;
    @Inject
    ProductRepository productRepository;
    @Inject
    EventRepository eventRepository;
    public Object getPricelistForEvent(String event) {
        Query query = entityManager.createQuery("select p.name, pl.price " +
                "from Product p " +
                "join Pricelist pl on p.id = pl.id " +
                "where pl.event.name = :eventId");


        query.setParameter("eventId", event);
        return query.getResultList();
    }
//
    public Pricelist createPricelist(String productName, int price, String eventName) {
        var pricelist = new Pricelist();

        pricelist.setProduct(productRepository.getProductByNameForPricelist(productName));
        pricelist.setEvent(eventRepository.getEventByNameForPricelist(eventName));
        pricelist.setPrice(price);

        entityManager.persist(pricelist);
        return pricelist;
    }
}
