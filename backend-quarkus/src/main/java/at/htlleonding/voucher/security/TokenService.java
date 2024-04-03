package at.htlleonding.voucher.security;

import io.quarkus.security.User;
import jakarta.enterprise.context.RequestScoped;
import jakarta.json.Json;
import org.eclipse.microprofile.jwt.Claims;
import org.jboss.logmanager.Logger;
import org.jose4j.jwt.JwtClaims;

import java.util.Arrays;
import java.util.UUID;


@RequestScoped
public class TokenService {
    public final static Logger LOGGER = Logger.getLogger(TokenService.class.getSimpleName());

    public String generateUserToken(String email, String username) {
        return generateToken(email, username, Roles.USER);
    }

    public String generateEventToken(Long id, int key) {
        return generateTokenForEvent(id, key);
    }

    public String generateServiceToken(String serviceId, String serviceName) {
        return generateToken(serviceId,serviceName,Roles.SERVICE);
    }

    public String generateToken(String subject, String name, String... roles) {
        try {
            JwtClaims jwtClaims = new JwtClaims();
            jwtClaims.setIssuer("lab-jwt"); // change to your company
            jwtClaims.setJwtId(UUID.randomUUID().toString());
            jwtClaims.setSubject(subject);
            jwtClaims.setClaim(Claims.upn.name(), subject);
            jwtClaims.setClaim(Claims.preferred_username.name(), name); //add more
            jwtClaims.setClaim(Claims.groups.name(), Arrays.asList(roles));
            jwtClaims.setAudience("using-jwt");
            jwtClaims.setExpirationTimeMinutesInTheFuture(60); // TODO specify how long do you need


            String token = TokenUtils.generateTokenString(jwtClaims);
            LOGGER.info("TOKEN generated: " + token);
            return token;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    public String generateTokenForEvent(Long id, int key) {
        try {
            JwtClaims jwtClaims = new JwtClaims();
            jwtClaims.setIssuer("lab-jwt"); // change to your company
            jwtClaims.setJwtId(UUID.randomUUID().toString());
            jwtClaims.setClaim("eventId", id); // Example custom claim for event ID
            jwtClaims.setClaim("eventKey", key); // Example custom claim for event key
            jwtClaims.setAudience("using-jwt");
            jwtClaims.setExpirationTimeMinutesInTheFuture(60); // TODO specify how long do you need

            String token = TokenUtils.generateTokenString(jwtClaims);
            LOGGER.info("TOKEN generated: " + token);
            return token;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}
