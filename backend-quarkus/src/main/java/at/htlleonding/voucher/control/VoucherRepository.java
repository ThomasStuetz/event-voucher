package at.htlleonding.voucher.control;

import at.htlleonding.voucher.entity.Voucher;
import at.htlleonding.voucher.entity.dto.VoucherDto;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@ApplicationScoped
public class VoucherRepository implements PanacheRepositoryBase<Voucher, UUID> {

    @ConfigProperty(name = "max.vouchers.to.create")
    int maxVouchersToCreate;

    @ConfigProperty(name = "qrcode.resources.path")
    String qrcodeResourcesPath;

    @ConfigProperty(name = "qrcode.web.path")
    String qrcodeWebPath;


    /**
     * Creates a new voucher with the given value in Euro.
     * The voucher is persisted in the database, so a uuid is generated.
     * The QR code is created in the database.
     * The QR code image is written to a file in the file system.
     * The web-path of the QR code image is stored in the database.
     * @param valueEuro value of the voucher in Euro
     * @return created Voucher
     */
    public Voucher createVoucher(int valueEuro) {
        var voucher = new Voucher(valueEuro);
        persist(voucher);
        Log.info("persist voucher -> id = " + voucher.toString());
        voucher.setQrCodeImage(voucher.createQrCode());
        voucher.writeQrCodeToFile(Path.of(qrcodeResourcesPath).resolve(qrcodeWebPath));
        voucher.setQrCodeImagePath(qrcodeWebPath + "/" + voucher.getId() + ".png");
        return voucher;
    }

    /**
     * Cancels a voucher and sets the cancelDateTime to the current time.
     *
     * @param id of the voucher to cancel
     **/
    public Voucher cancelVoucher(UUID id) {
        var voucher = findById(id);
        voucher.setValid(false);
        voucher.setCancelDateTime(LocalDateTime.now());
        getEntityManager().merge(voucher);
        return getEntityManager().merge(voucher);
    }


    /**
     * Deletes all vouchers in the database.
     * Creates the number of vouchers with the given value
     *
     * @param valueEuro value of the voucher in Euro
     * @param noOfVouchers number of vouchers to create
     */
    public void createBulkVouchers(int valueEuro, int noOfVouchers) {
        Log.info("max vouchers to create: " + maxVouchersToCreate);
        deleteAll();
        int noOfVouchersToCreate = Math.min(noOfVouchers, maxVouchersToCreate);
        Log.info("no of vouchers to create: " + noOfVouchersToCreate);
//        IntStream.rangeClosed(1, noOfVouchersToCreate)
//                .forEach(i -> createVoucher(valueEuro));
        List<Voucher> createdVouchers = IntStream
                .rangeClosed(1, noOfVouchersToCreate)
                .mapToObj(i -> createVoucher(valueEuro))
                .toList();

    }


    public List<VoucherDto> getAllVouchers() {
        return findAll().stream()
                .map(v -> {
                    Path path = Path.of(qrcodeResourcesPath).resolve(qrcodeWebPath);
                    v.writeQrCodeToFile(path);
                            return v.toDto();
                        }
                ).toList();
    }


}
