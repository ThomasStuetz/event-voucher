package at.htlleonding.voucher.boundary;

import at.htlleonding.voucher.control.VoucherRepository;
import at.htlleonding.voucher.entity.Voucher;
import at.htlleonding.voucher.entity.dto.VoucherDto;
import com.fasterxml.jackson.databind.deser.std.UUIDDeserializer;
import com.sun.tools.jconsole.JConsoleContext;
import io.quarkus.logging.Log;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.UUID;

@Path("/api/qrcodes")
public class VoucherResource {

    @Inject
    VoucherRepository voucherRepository;

    @GET
    @Path("{id}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVoucher(
            @PathParam("id") UUID id,
            @QueryParam("amount") int amount
            /*@QueryParam("cancel") boolean cancel*/) {

        voucherRepository.debitAmount(id, amount);

        Object voucher = voucherRepository.getAllVouchers();
        VoucherWebSocket.pushData(voucher);

        return Response.ok(voucherRepository.findById(id).toDto()).build();
    }

    @GET
    @Path("/getAmount/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAmount(@PathParam("id") UUID id) {

        return Response.ok(voucherRepository.findById(id).getValueEuro()).build();
    }

    @POST
    @Transactional
    @Produces(MediaType.TEXT_PLAIN)
    public Response createVoucher(
            @QueryParam("value") int valueEuro,
            @QueryParam("no") int noOfVouchers,
            @QueryParam("event") Long eventId
    ) {

        System.out.println(eventId);


        voucherRepository.createBulkVouchers(valueEuro, noOfVouchers, eventId);

        Object voucher = voucherRepository.getAllVouchers();
        VoucherWebSocket.pushData(voucher); // Send updated list to all WebSocket clients
        return Response.ok(noOfVouchers + "voucher created").build();
    }


    @GET
    @Path("/startup")
    @Produces(MediaType.APPLICATION_JSON)
    public Response allVouchersStartup() {
        return Response.ok(voucherRepository.getAllVouchers()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response allVouchers(
            @QueryParam("mail") String mail
    ) {
        System.out.println(mail);

        Object vouchers = voucherRepository.getUserVouchers(mail);
        VoucherWebSocket.pushData(vouchers);
        return Response.ok(vouchers).build();
    }

    @GET
    @Path("/forEvent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVouchersFromEvent(
            @QueryParam("event") Long eventId
    ) {
        System.out.println(eventId);
        return Response.ok(voucherRepository.getVouchersFromEvent(eventId)).build();
    }
}
