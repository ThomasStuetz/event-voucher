package at.htlleonding.voucher.entity.dto;



import java.time.LocalDateTime;
import java.util.UUID;

public record VoucherDto (
        UUID id,
        int valueEuro,
        LocalDateTime createDateTime,
        LocalDateTime cancelDateTime,
        boolean valid,
        String qrCodeImagePath
) { }
