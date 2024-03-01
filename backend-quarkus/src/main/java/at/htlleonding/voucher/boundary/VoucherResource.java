package at.htlleonding.voucher.boundary;

import at.htlleonding.voucher.control.VoucherRepository;
import at.htlleonding.voucher.entity.dto.VoucherDto;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
    public Response getVoucher(@PathParam("id") UUID id, @QueryParam("cancel") boolean cancel) {

        if (cancel) {
            voucherRepository.cancelVoucher(id);
        }
        Object voucher = voucherRepository.getAllVouchers();
        VoucherWebSocket.pushData(voucher);

        return Response.ok(voucherRepository.findById(id).toDto()).build();
    }

    @POST
    @Transactional
    @Produces(MediaType.TEXT_PLAIN)
    public Response createVoucher(
            @QueryParam("value") int valueEuro,
            @QueryParam("no") int noOfVouchers,
            @QueryParam("mail") String emailOfUser
    ) {
        System.out.println(emailOfUser);


        voucherRepository.createBulkVouchers(valueEuro, noOfVouchers, emailOfUser);

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
    public Response allVouchers() {
        Object vouchers = voucherRepository.getAllVouchers();
        VoucherWebSocket.pushData(vouchers);
        return Response.ok(vouchers).build();
    }

}
