public interface DiscountStrategy {

    double getDiscount(double basePrice, int quantity);
}
