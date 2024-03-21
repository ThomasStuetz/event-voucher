package at.htlleonding.pricelist;

import jakarta.inject.Inject;
import jakarta.json.*;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
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
    public Response getPricelist(
            @QueryParam("event") String event
    ) {
        return Response.ok(pricelistRepository.getPricelistForEvent(event)).build();
    }

    @POST
    @Transactional
    public Response createPriceList(
             @QueryParam("productName") String productName,
             @QueryParam("price") int price,
             @QueryParam("eventName") String eventName
    ) {
        return Response.ok(pricelistRepository.createPricelist(productName, price, eventName)).build();
    }


//    @POST
//    @Transactional
//    @Consumes(MediaType.APPLICATION_JSON)
//    public Response createPricelist(Map<String, Integer> prices) {
//
//        for (Map.Entry<String, Integer> entry : prices.entrySet()) {
//            String productType = entry.getKey();
//            int price = entry.getValue();
//            if (price != 0) {
//                pricelistRepository.createPricelist(productType, price);
//            }
//        }
//        return Response.ok().build();
////        return Response.ok(/*pricelistRepository.createPricelist(alkPrice, price)*/).build();
//
//    }


//    @POST
//    @Transactional
//    @Consumes(MediaType.APPLICATION_JSON)
//    public Response createPricelist(InputStream input) {
//
//
//
//        try (JsonReader jsonReader = Json.createReader(input)) {
//            JsonObject pricesJson = jsonReader.readObject();
//
//            for (Map.Entry<String, JsonValue> entry : pricesJson.entrySet()) {
//                String productType = entry.getKey();
//                int price = ((JsonNumber) entry.getValue()).intValue();
//                if (price != 0) {
//                    pricelistRepository.createPricelist(productType, price);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid JSON format").build();
//        }
//
//        return Response.ok().build();
//    }
}
