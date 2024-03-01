//package at.htlleonding.voucher.boundary;
//
//import at.htlleonding.voucher.control.VoucherRepository;
//import at.htlleonding.voucher.entity.Voucher;
//import at.htlleonding.voucher.entity.dto.VoucherDto;
//import io.agroal.api.AgroalDataSource;
//import io.quarkus.logging.Log;
//import io.quarkus.panache.common.Page;
//import io.quarkus.panache.common.Sort;
//import io.quarkus.test.junit.QuarkusTest;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import org.assertj.db.type.Table;
//import org.jboss.logging.Logger;
//import org.junit.jupiter.api.*;
//
//import java.util.List;
//import java.util.stream.IntStream;
//
//import static io.restassured.RestAssured.given;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.CoreMatchers.is;
//import static org.junit.jupiter.api.Assertions.*;
//
//@QuarkusTest
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//class VoucherResourceTest {
//
//    private static final Logger LOG = Logger.getLogger(Voucher.class.getSimpleName());
//
//    @Inject
//    VoucherRepository voucherRepository;
//
//    @Inject
//    AgroalDataSource ds;
//
//    @BeforeEach
//    @Transactional
//    void setUp() {
//        voucherRepository.deleteAll();
//        IntStream.rangeClosed(1,5)
//                .forEach(i -> voucherRepository.createVoucher(3));
//    }
//
//    @Order(1000)
//    @Test
//    void givenFirstVoucherInDatabase_whenRequesting_thenGetValidVoucherDto() {
//
//        List<Voucher> firstVoucher = voucherRepository.findAll(Sort.by("id").ascending()).page(Page.ofSize(1)).list();
//        System.out.println(firstVoucher.get(0).getId());
//
//        VoucherDto retrievedVoucher = given()
//                .when().get("/api/voucher/" + firstVoucher.get(0).getId())
//                .then()
//                .statusCode(200)
//                .extract().as(VoucherDto.class);
//
//        assertThat(retrievedVoucher.id()).isEqualTo(firstVoucher.get(0).getId());
//        assertThat(retrievedVoucher.valueEuro()).isEqualTo(firstVoucher.get(0).getValueEuro());
//        assertThat(retrievedVoucher.createDateTime()).isEqualTo(firstVoucher.get(0).getCreateDateTime());
//        assertThat(retrievedVoucher.cancelDateTime()).isNull();
//        assertThat(retrievedVoucher.valid()).isTrue();
//        assertThat(retrievedVoucher.qrCodeImagePath()).contains("qrcodes/");
//
//
////        given()
////                .when().get("/api/voucher/" + firstVoucher.get(0).getId())
////                .then()
////                .statusCode(200)
////                .body(is(
////                        "{\"id\":\"" + firstVoucher.get(0).getId() +
////                                "\",\"valueEuro\":3,\"createDateTime\":\""
////                                + firstVoucher.get(0).getCreateDateTime()
////                                + "\",\"cancelDateTime\":null,\"valid\":true}"
////                ));
//    }
//
//    @Order(2000)
//    @Test
//    void givenFirstVoucherInDatabase_whenCancelIsTrue_thenInvalidateVoucherDto() {
//
//        List<Voucher> firstVoucher = voucherRepository.findAll(Sort.by("id").ascending()).page(Page.ofSize(1)).list();
//        System.out.println(firstVoucher.get(0).getId());
//
//        VoucherDto retrievedVoucher = given()
//                .when().get("/api/voucher/" + firstVoucher.get(0).getId() + "?cancel=true")
//                .then()
//                .statusCode(200)
//                .extract().as(VoucherDto.class);
//
//        LOG.info("retrievedVoucher: " + retrievedVoucher.toString());
//
//        assertThat(retrievedVoucher.id()).isEqualTo(firstVoucher.get(0).getId());
//        assertThat(retrievedVoucher.valueEuro()).isEqualTo(firstVoucher.get(0).getValueEuro());
//        assertThat(retrievedVoucher.createDateTime()).isEqualTo(firstVoucher.get(0).getCreateDateTime());
//        assertThat(retrievedVoucher.cancelDateTime()).isNotNull();
//        assertThat(retrievedVoucher.valid()).isFalse();
//
//    }
//
//
//    @Order(3000)
//    @Test
//    void givenNothing_whenRequesting15Vouchers_thenCreate15VouchersInDatabase() {
//
//        given()
//                .when().post("/api/voucher?value=3&no=15")
//                .then()
//                .statusCode(200)
//                .body(is("15 vouchers created"));
//
//        Table createdVouchers = new Table(ds, "voucher");
//        org.assertj.db.api.Assertions.assertThat(createdVouchers).hasNumberOfRows(15);
//
//
//    }
//
//}