package at.htlleonding.voucher.control;

import io.quarkus.logging.Log;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.configuration.ConfigUtils;
import io.quarkus.runtime.configuration.ProfileManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.stream.IntStream;

@ApplicationScoped
public class InitBean {

    @Inject
    VoucherRepository voucherRepository;

    @Transactional
    void init(@Observes StartupEvent event) {
        Log.info("Staring with profile " + ConfigUtils.getProfiles());
        //if(ConfigUtils.getProfiles().get(0).equals("dev")) {
//        if(ConfigUtils.getProfiles().contains("dev")) {
//            IntStream.rangeClosed(1,10)
//                    .forEach(i -> voucherRepository.createVoucher(3));
//        }
    }

}
