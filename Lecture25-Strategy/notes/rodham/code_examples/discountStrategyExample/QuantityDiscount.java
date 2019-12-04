public class QuantityDiscount implements DiscountStrategy {

    private int discountThreshold;
    private float discountPercentage;

    public QuantityDiscount(int discountThreshold, float discountPercentage) {
        this.discountThreshold = discountThreshold;
        this.discountPercentage = discountPercentage;
    }

    @Override
    public double getDiscount(double basePrice, int quantity) {
        double discount = 0;

        if(quantity >= discountThreshold) {
            PercentageDiscount percentageDiscount = new PercentageDiscount(discountPercentage);
            discount = percentageDiscount.getDiscount(basePrice, quantity);
        }

        return discount;
    }
}
