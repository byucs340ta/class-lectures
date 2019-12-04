public class PriceCalculator {

    private DiscountStrategy discountStrategy;

    public PriceCalculator(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculatePrice(double itemPrice, int quanity) {
        double price = itemPrice * quanity;
        price -= discountStrategy.getDiscount(price, quanity);
        return price;
    }
}
