package at.htlleonding.event;

import at.htlleonding.voucher.user.User;
import at.htlleonding.voucher.user.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/api/events")
public class EventResource {

    @Inject
    EventRepository eventRepository;

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

}
