package at.htlleonding.voucher.entity;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import io.quarkus.logging.Log;
import org.eclipse.microprofile.config.ConfigProvider;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class VoucherTest {

    // for testing purposes the images are created in the target-folder
    private final String qrCodePath = "target/qrcodes";

    @Order(1000)
    @Test
    void givenAEnvFile_whenImporting() {
        var v = new Voucher();
        Log.info(v.serverUrl);
        assertThat(v.serverUrl)
                .withFailMessage("Einlesen des Werts 'SERVER_URL' aus der .env-datei funktioniert nicht")
                .isEqualTo("http://localhost:8080/api/qrcodes");
    }

    @Order(1100)
    @Test
    void givenNothing_whenCreatingAVoucherWithoutPersisting_thenNoUuidIsInserted() {
        var actualVoucher = new Voucher(2);
        Log.info(actualVoucher.toString());

        assertThat(actualVoucher.getId()).isNull();
        assertThat(actualVoucher.getCreateDateTime()).isNotNull();
        assertThat(actualVoucher.getCancelDateTime()).isNull();
        assertThat(actualVoucher.getValueEuro()).isEqualTo(2);
    }

    @Order(1200)
    @Test
    void givenNothing_whenCreatingAVoucherWithoutValue_thenDefaultValueOf3() {
        var actualVoucher = new Voucher();
        Log.info(actualVoucher.toString());

        assertThat(actualVoucher.getId()).isNull();
        assertThat(actualVoucher.getCreateDateTime()).isNotNull();
        assertThat(actualVoucher.getCancelDateTime()).isNull();
        assertThat(actualVoucher.getValueEuro()).isEqualTo(3);
    }

    @Order(1300)
    @Test
    void givenAVoucher_whenPrintToConsole_thenConvertToString() {
        var actualVoucher = new Voucher();
        actualVoucher.setId(UUID.fromString("0744b97e-e85d-4a62-8fd6-f501f708acfb"));
        Log.info(actualVoucher.toString());

        assertThat(actualVoucher.getId().toString())
                .isEqualTo("0744b97e-e85d-4a62-8fd6-f501f708acfb");
    }

    @Order(1400)
    @Test
    void givenAVoucherWithQrQode_whenWritingToFile_theFileExists() {
        var actualVoucher = new Voucher();
        actualVoucher.setId(UUID.fromString("0744b97e-e85d-4a62-8fd6-f501f708acfb"));
        actualVoucher.setQrCodeImage(actualVoucher.createQrCode());

        actualVoucher.writeQrCodeToFile(Paths.get("."));
    }

    @Order(1500)
    @Test
    void givenAVoucher_whenRequestingADto_thenReturnADto() {
        // arrange
        var actualVoucher = new Voucher(3);
        actualVoucher.setId(UUID.fromString("0744b97e-e85d-4a62-8fd6-f501f708acfb"));
        LocalDateTime createDateTime = actualVoucher.getCreateDateTime();

        // act
        var actualDto = actualVoucher.toDto();
        System.out.println(actualDto.toString());

        // assert
        assertThat(actualDto.id().toString()).isEqualTo("0744b97e-e85d-4a62-8fd6-f501f708acfb");
        assertThat(actualDto.valueEuro()).isEqualTo(3);
        assertThat(actualDto.createDateTime()).isEqualTo(createDateTime);
        assertThat(actualDto.valid()).isTrue();
    }

    @Order(1600)
    @Test
    void given14Vouchers_whenCreating14QrCodeImages_thenFilesInFolderAreCreated() {

        try {
            Files.createDirectories(Paths.get(qrCodePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        deleteFilesInDirectory(qrCodePath);

        IntStream.rangeClosed(1, 14)
                .forEach(i -> {
                    var v = new Voucher(i);
                    v.setId(UUID.randomUUID());
                    v.setQrCodeImage(v.createQrCode());
                    v.writeQrCodeToFile(Paths.get(qrCodePath));
                });

        assertThat(countFilesInDirectory(qrCodePath)).isEqualTo(14);

    }































    private void deleteFilesInDirectory(String directoryPath) {
        Path dir = Paths.get(directoryPath);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path path : stream) {
                Files.delete(path);
            }
        } catch (IOException e) {
            Log.error("Error deleting files: " + e.getMessage());
        }
    }

    private int countFilesInDirectory(String directoryPath) {
        Path dir = Paths.get(directoryPath);
        int fileCount = 0;
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path path : stream) {
                if (Files.isRegularFile(path)) {
                    fileCount++;
                }
            }
        } catch (IOException e) {
            System.err.println("Error counting files: " + e.getMessage());
        }
        return fileCount;
    }

    private List<String> getFileNamesInDirectory(String directoryPath) {
        Path dir = Paths.get(directoryPath);
        List<String> fileNames = new ArrayList<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path path : stream) {
                if (Files.isRegularFile(path)) {
                    fileNames.add(path.getFileName().toString());
                }
            }
        } catch (IOException e) {
            System.err.println("Error retrieving file names: " + e.getMessage());
        }
        return fileNames;
    }
}