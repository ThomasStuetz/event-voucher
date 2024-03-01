package at.htlleonding.voucher.user;

import at.htlleonding.voucher.entity.Token;
import at.htlleonding.voucher.security.TokenService;
import io.smallrye.jwt.auth.principal.JWTParser;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jdk.jfr.ContentType;
import org.eclipse.microprofile.jwt.Claims;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    TokenService service;

    @POST
    @Path("/register")
    @Transactional
    public User register(User user) {
        user.persist(); //super simplified registration, no checks of uniqueness
        return user;
    }

    @GET
    @Path("/login")
    public Response login(@QueryParam("login")String login, @QueryParam("password") String password) {
        User existingUser = User.find("login", login).firstResult();
        if(existingUser == null || !existingUser.password.equals(password)) {
            throw new WebApplicationException(Response.status(404).entity("No user found or password is incorrect").build());
        }
        String token = service.generateToken(existingUser.email, password);

//        JWTParser(token)

//        System.out.println(service.generateToken(existingUser.email, password));
        return Response.ok(new Token(service.generateUserToken(existingUser.email, password))).build();
    }
}
