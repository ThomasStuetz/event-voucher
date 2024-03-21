package at.htlleonding.product;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;

@Path("/api/product")
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    @GET
    public Response getProductByName(
            @QueryParam("name") String name
    ) {
        return Response.ok(productRepository.getProductByName(name)).build();
    }
}
