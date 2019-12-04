import java.util.Calendar;
import java.util.Date;

public class TwoTenNetThirtyDiscount implements DiscountStrategy {

    private Calendar purchaseDate;
    private double latePenalty;

    public TwoTenNetThirtyDiscount(Date purchaseDate, double latePenalty) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(purchaseDate);
        this.purchaseDate = calendar;

        this.latePenalty = latePenalty;
    }

    @Override
    public double getDiscount(double basePrice, int quantity) {
        Calendar discountDate = (Calendar) purchaseDate.clone();
        discountDate.add(Calendar.DAY_OF_YEAR, 10);

        Calendar penaltyDate = (Calendar) purchaseDate.clone();
        penaltyDate.add(Calendar.DAY_OF_YEAR, 30);

        Calendar now = Calendar.getInstance();

        double discount = 0;
        if(now.before(discountDate)) {
            // Apply the 2% discount
            discount = basePrice * 0.02;
        } else if(now.after(penaltyDate)) {
            discount = basePrice * latePenalty * -1;
        }

        return discount;
    }
}
