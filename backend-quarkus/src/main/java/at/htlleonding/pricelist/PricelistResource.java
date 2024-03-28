package at.htlleonding.pricelist;

import jakarta.inject.Inject;
import jakarta.json.*;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.management.Query;
import java.io.InputStream;
import java.util.Map;

@Path("/api/pricelist")
public class PricelistResource {

    @Inject
    PricelistRepository pricelistRepository;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPricelist() {
        System.out.println("hello world fomr pricelist all");
        return Response.ok(pricelistRepository.listAll()).build();
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
}
