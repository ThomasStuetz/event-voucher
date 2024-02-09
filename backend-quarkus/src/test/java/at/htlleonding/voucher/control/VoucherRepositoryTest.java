package at.htlleonding.voucher.control;

import at.htlleonding.voucher.entity.Voucher;
import io.agroal.api.AgroalDataSource;
import io.quarkus.logging.Log;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.assertj.db.type.Table;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.db.api.Assertions.assertThat;
import static org.assertj.db.output.Outputs.output;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class VoucherRepositoryTest {

    @Inject
    VoucherRepository voucherRepository;

    @Inject
    AgroalDataSource ds;

    @ConfigProperty(name = "max.vouchers.to.create")
    int maxVouchersToCreate;

    @BeforeEach
    @Transactional
    void setUp() {
        voucherRepository.deleteAll();
    }

    @AfterAll
    static void afterAll() {
        deleteFilesInDirectory("src/main/resources/META-INF/resources/qrcodes");
    }

    @Order(1000)
    @Test
    @Transactional
    void givenNothing_whenCreatingAVoucher_thenCreateImageAndImagePath() {
//        List<Voucher> createdVouchers =  IntStream
//                .rangeClosed(1,12)
//                .mapToObj(i -> voucherRepository.createVoucher(3))
//                .toList();

        var actualVoucher = voucherRepository.createVoucher(3);

        voucherRepository.flush();

        Table voucherTable = new Table(ds, "voucher");
        output(voucherTable).toConsole();
        assertThat(voucherTable).column("V_QRCODE_IMAGE_PATH")
                .value().isEqualTo(actualVoucher.getQrCodeImagePath());
        org.assertj.core.api.Assertions.assertThat(actualVoucher.getQrCodeImagePath()).contains("qrcodes");

        try {
            List<String> listFiles = Files.list(Path.of("src/main/resources/META-INF/resources/qrcodes"))
                    .map(p -> p.getFileName().toString())
                    .filter(s -> s.contains(actualVoucher.getId().toString()+".png"))
                    .toList();
            org.assertj.core.api.Assertions.assertThat(listFiles).contains(actualVoucher.getId().toString() + ".png");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }




    @Order(1100)
    @Test
    @Transactional
    void givenNothing_whenCreatingBulkVouchers_thenCreateImage() {
//        List<Voucher> createdVouchers =  IntStream
//                .rangeClosed(1,12)
//                .mapToObj(i -> voucherRepository.createVoucher(3))
//                .toList();

        voucherRepository.createBulkVouchers(3, 12);

        voucherRepository.flush();

        Table voucherTable = new Table(ds, "voucher");
        output(voucherTable).toConsole();
        assertThat(voucherTable).hasNumberOfRows(12);
    }

    @Order(1200)
    @Test
    @Transactional
    void givenNothing_whenCreatingBulkVouchersVoucherOverMax_thenCreateImage() {
        voucherRepository.createBulkVouchers(3, maxVouchersToCreate + 10);

        voucherRepository.flush();

        Table voucherTable = new Table(ds, "voucher");
        output(voucherTable).toConsole();
        assertThat(voucherTable).hasNumberOfRows(maxVouchersToCreate);
    }



    private static void deleteFilesInDirectory(String directoryPath) {
        Path dir = Paths.get(directoryPath);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path path : stream) {
                Files.delete(path);
            }
        } catch (IOException e) {
            Log.error("Error deleting files: " + e.getMessage());
        }
    }

}