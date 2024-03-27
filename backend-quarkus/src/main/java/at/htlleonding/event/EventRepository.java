package at.htlleonding.event;

import at.htlleonding.voucher.user.User;
import at.htlleonding.voucher.user.UserRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;


import java.util.List;
import java.util.Random;


@ApplicationScoped
public class EventRepository implements PanacheRepository<Event> {

    @Inject
    EntityManager entityManager;
    @Inject
    UserRepository userRepository;

    Random random = new Random();

    public Object getAllEventsFromOrganization(String mail) {
        Query query = entityManager.createQuery("SELECT e " +
                "FROM Event e " +
                "WHERE e.userId in (SELECT u.id FROM User u where u.email = :mail)");
        query.setParameter("mail", mail);

        return query.getResultList();
        
    }

    public Event createEvent(String name, String mail) {
        User user = userRepository.findByEmail(mail);
        var event = new Event(name);
        event.setUserId(user);
        event.setKey(random.nextInt(1000));
        persist(event);
        return event;
    }

    public Object getEventByName(String name) {
        return find("name", name).firstResult();
    }

    public Event getEventByIdForPricelist(Long id) {
        return findById(id);
    }

    public Event getEventByNameForPricelist(String name) {
        return find("name", name).firstResult();
    }
}
