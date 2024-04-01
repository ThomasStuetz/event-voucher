package at.htlleonding.pricelist;

import at.htlleonding.event.Event;
import at.htlleonding.event.EventRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/api/pricelist")
public class PricelistResource {

    @Inject
    PricelistRepository pricelistRepository;
    @Inject
    EventRepository eventRepository;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPricelist(
            @QueryParam("mail") String mail
    ) {
        System.out.println("hello world fomr pricelist all");

        return Response.ok(pricelistRepository.getAllFromUser(mail)).build();
//        return Response.ok(pricelistRepository.listAll()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPricelistForEvent(
            @QueryParam("eventId") Long eventId
    ) {
        Object pricelist = pricelistRepository.getPricelistForEvent(eventId);

        return Response.ok(pricelist).build();
    }

    @POST
    @Transactional
    public Response createPriceList(
            @QueryParam("productName") String productName,
            @QueryParam("price") int price,
            @QueryParam("eventId") Long eventId
    ) {
        return Response.ok(pricelistRepository.createPricelist(productName, price, eventId)).build();
    }


    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPricelist(
            Map<String, Integer> prices,
            @QueryParam("eventId") Long eventId
    ) {
        for (Map.Entry<String, Integer> entry : prices.entrySet()) {
            String productType = entry.getKey();
            int price = entry.getValue();
            if (price != 0) {
                pricelistRepository.createPricelist(productType, price, eventId);
            }
        }
        return Response.ok().build();
    }

    @GET
    @Transactional
    @Path("/remove")
    public Response removePricelistForEvent(
            @QueryParam("eventId") Long eventId
    ) {
        Event event = eventRepository.findById(eventId);
        return Response.ok(pricelistRepository.delete("event", event)).build();
    }
}
