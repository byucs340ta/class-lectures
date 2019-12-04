public class PercentageDiscount implements DiscountStrategy {

    private float discountPercentage;

    public PercentageDiscount(float discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    @Override
    public double getDiscount(double basePrice, int quantity) {
        return basePrice * discountPercentage;
    }
}
