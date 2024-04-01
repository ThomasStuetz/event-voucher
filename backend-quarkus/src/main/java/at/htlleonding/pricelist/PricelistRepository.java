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
    public Object getPricelistForEvent(Long eventId) {
        Query query = entityManager.createQuery("select pl " +
                "from Pricelist pl " +
                "join Product p on p.id = pl.product.id " +
                "where pl.event.id = :eventId");


        query.setParameter("eventId", eventId);
        return query.getResultList();
    }

    public Pricelist createPricelist(String productName, int price, Long eventId) {
        var pricelist = new Pricelist();

        pricelist.setProduct(productRepository.getProductByNameForPricelist(productName));
        pricelist.setEvent(eventRepository.getEventByIdForPricelist(eventId));

        pricelist.setPrice(price);

        entityManager.persist(pricelist);
        return pricelist;
    }

    public Object getAllFromUser(String mail) {
        Query query = entityManager.createQuery("SELECT p FROM Pricelist p WHERE p.event.userId.email = :mail");
        query.setParameter("mail", mail);

        return query.getResultList();
    }
}
