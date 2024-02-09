package at.htlleonding.voucher.entity;

import at.htlleonding.voucher.entity.dto.VoucherDto;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import io.quarkus.logging.Log;
import jakarta.persistence.*;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Voucher {

    //private static final Logger LOG = Logger.getLogger(Voucher.class.getSimpleName());

    // @ConfigProperty(name = "server.url")
    @Transient
    String serverUrl = ConfigProvider
            .getConfig()
            .getValue("server.url", String.class);

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "v_id")
    private UUID id;

    @Column(name = "v_create_date_time", updatable = false)
    private LocalDateTime createDateTime;

    @Column(name = "v_is_valid")
    private boolean isValid;

    @Column(name = "v_cancel_date_time")
    private LocalDateTime cancelDateTime;

    @Column(name = "v_value_euro")
    private int valueEuro;

//    @Lob
    @Column(name = "v_qrcode_image")
    private byte[] qrCodeImage;

    @Column(name = "v_qrcode_image_path")
    private String qrCodeImagePath;

    public Voucher() {
        this.createDateTime = LocalDateTime.now();
        this.isValid = true;
        this.valueEuro = 3;
        Log.info("created voucher -> id = " + this.toString());
    }

    public Voucher(int valueEuro) {
        this();
        this.valueEuro = valueEuro;
    }


    //region getter and setter
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(LocalDateTime createDateTime) {
        this.createDateTime = createDateTime;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public LocalDateTime getCancelDateTime() {
        return cancelDateTime;
    }

    public void setCancelDateTime(LocalDateTime cancelDateTime) {
        this.cancelDateTime = cancelDateTime;
    }

    public int getValueEuro() {
        return valueEuro;
    }

    public void setValueEuro(int valueEuro) {
        this.valueEuro = valueEuro;
    }

    public byte[] getQrCodeImage() {
        return qrCodeImage;
    }

    public void setQrCodeImage(byte[] qrCode) {
        this.qrCodeImage = qrCode;
    }

    public String getQrCodeImagePath() {
        return qrCodeImagePath;
    }

    public void setQrCodeImagePath(String qrCodeImagePath) {
        this.qrCodeImagePath = qrCodeImagePath;
    }

    //endregion


    /**
     * Create a string representation of the voucher.
     * The string contains the id and the validity of the voucher.
     *
     * @return String representation of the voucher
     */
    @Override
    public String toString() {
        return id + String.format(" (%s), ", isValid ? "valid" : "used");
    }

    public VoucherDto toDto() {
        return new VoucherDto(id
                , valueEuro
                , createDateTime
                , cancelDateTime
                , isValid
                , qrCodeImagePath
        );
    }

    /**
     * Creates a QR-Code for the current voucher.
     * The QR-Code is created with the id of the voucher and the server URL from the .env-file.
     * The size of the QR-code is 350,350
     * When the id is null then raise a RuntimeException with message "No ID available for creating QR-Code"
     *
     * @return byte array of the created QR-Code
     */
    public byte[] createQrCode() {
        if (getId() == null) {
            throw new RuntimeException("No ID available for creating QR-Code");
        }

        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        // create a bit matrix
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = qrCodeWriter.encode(
                    serverUrl + "/" + getId().toString(),
                    BarcodeFormat.QR_CODE,
                    350,
                    350
            );

            // write to byte array
            BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(qrCodeImage, "png", baos);
            return baos.toByteArray();

        } catch (WriterException | IOException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * Writes the QR-Code image to a file.
     * The file is stored in the given path with the id of the voucher as filename (png).
     * When the qrCodeImage is null then raise a RuntimeException with message "No QR-Code available"
     * IOExceptions are converted into RuntimeExceptions
     *
     * @param path the path where the QR-Code image is stored
     */
    public void writeQrCodeToFile(Path path) {
        if (qrCodeImage == null) {
            throw new RuntimeException("No QR-Code available");
        }
        path = path.resolve(id + ".png");
        try {
            Files.write(path, qrCodeImage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
