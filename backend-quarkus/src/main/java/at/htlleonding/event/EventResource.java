package at.htlleonding.event;

import at.htlleonding.pricelist.PricelistRepository;
import at.htlleonding.voucher.control.VoucherRepository;
import at.htlleonding.voucher.security.Token;
import at.htlleonding.voucher.security.TokenService;
import at.htlleonding.voucher.user.User;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/api/events")
public class EventResource {

    @Inject
    EventRepository eventRepository;
    @Inject
    VoucherRepository voucherRepository;
    @Inject
    PricelistRepository pricelistRepository;
    @Inject
    TokenService tokenService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEvents(
            @QueryParam("mail") String mail
    ) {
        return Response.ok(eventRepository.getAllEventsFromOrganization(mail)).build();
    }

    @POST
    @Transactional
    public Response createEvent(
            @QueryParam("name") String name,
            @QueryParam("mail") String mail
    ) {
        return Response.ok(eventRepository.createEvent(name, mail)).build();
    }

    @GET
    @Path("/getByName")
    public Response getEventByName(
            @QueryParam("name") String name
    ) {
        return Response.ok(eventRepository.getEventByName(name)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/eventName")
    public Response getEventName(
            @QueryParam("id") Long id
    ) {
        return Response.ok(eventRepository.findById(id).getName()).build();
    }

    @GET
    @Transactional
    @Path("/remove")
    public Response removeEvent(
            @QueryParam("eventId") Long eventId
    ) {
        Event event = eventRepository.findById(eventId);
        if (!pricelistRepository.findAll().list().isEmpty()) {
            pricelistRepository.delete("event", event);
            System.out.println("!lskdjfsdlkfjsdlkfjsdklf");
        }
        if (!voucherRepository.findAll().list().isEmpty()) {
            voucherRepository.delete("eventId", event);
        }

        eventRepository.delete("id", eventId);

        return Response.ok(eventRepository.findById(eventId).getName()).build();
    }

    @GET
    @Path("/eventLogin")
    public Response eventLogin(
            @QueryParam("eventName") String name,
            @QueryParam("key") String key
    ) {
        Event exsistingEvent = eventRepository.find("name", name).firstResult();

        System.out.println(exsistingEvent);
        if (exsistingEvent == null) {
            throw new WebApplicationException(Response.status(404).entity("No user found or password is incorrect").build());
        }
        String token = tokenService.generateToken(exsistingEvent.getName(), key);

        return Response.ok(new Token(tokenService.generateServiceToken(exsistingEvent.getName(), key))).build();
    }
}
