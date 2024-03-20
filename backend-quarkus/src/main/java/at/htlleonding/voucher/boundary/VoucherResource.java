package at.htlleonding.voucher.boundary;

import at.htlleonding.voucher.control.VoucherRepository;
import at.htlleonding.voucher.entity.Voucher;
import at.htlleonding.voucher.entity.dto.VoucherDto;
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

    @Inject
    EntityManager entityManager;

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
    public Response allVouchers(
            @QueryParam("mail") String mail
    ) {
        System.out.println(mail);

        Query query = entityManager.createQuery("SELECT v " +
                "FROM Voucher v " +
                "WHERE v.userId in (SELECT u.id FROM User u where u.email = :mail)");

        query.setParameter("mail", mail);
        Object vouchers = query.getResultList();
//        Object vouchers = voucherRepository.getAllVouchers();
        VoucherWebSocket.pushData(vouchers);
        return Response.ok(vouchers).build();
    }

}
