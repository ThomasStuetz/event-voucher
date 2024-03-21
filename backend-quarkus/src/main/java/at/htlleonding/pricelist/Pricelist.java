package at.htlleonding.pricelist;

import at.htlleonding.event.Event;
import at.htlleonding.product.Product;
import at.htlleonding.voucher.user.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Pricelist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private int price;

    public Pricelist() {
    }


}
