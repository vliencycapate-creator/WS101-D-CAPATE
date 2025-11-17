import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // 1. User Greetings
        IO.print("Enter your name: ");
        String name = sc.nextLine();

        IO.print("Enter your age: ");
        int age = sc.nextInt();
        sc.nextLine();

        IO.println("Hello " + name + "! You are " + age + " years old.\n");

        // 2. Fibonacci
        IO.print("Enter number of terms: ");
        int n = sc.nextInt();

        int a = 0, b = 1, c;
        IO.print("Fibonacci Series: ");

        for (int i = 1; i <= n; i++) {
            IO.print(a + " ");
            c = a + b;
            a = b;
            b = c;
        }
        IO.println("\n");

        // 3. Array
        int[] numbers = new int[5];
        int sum = 0;

        IO.println("Enter 5 numbers:");
        for (int i = 0; i < 5; i++) {
            numbers[i] = sc.nextInt();
            sum += numbers[i];
        }

        double average = sum / 5.0;

        IO.println("Sum = " + sum);
        IO.println("Average = " + average + "\n");

        // 4. PALINDROME CHECK
        sc.nextLine(); // consume leftover newline

        IO.print("Enter a text: ");
        String text = sc.nextLine();

        String reversed = new StringBuilder(text).reverse().toString();

        if (text.equalsIgnoreCase(reversed)) {
            IO.println(text + " is a palindrome.\n");
        } else {
            IO.println(text + " is NOT a palindrome.\n");
        }

        // 5. Rectangle
        Rectangle r1 = new Rectangle(5, 3);
        Rectangle r2 = new Rectangle(10, 2.5);

        IO.println("Area of Rectangle 1 = " + r1.calculateArea());
        IO.println("Area of Rectangle 2 = " + r2.calculateArea() + "\n");

        // 6. Product

        ArrayList<Product> products = new ArrayList<>();
        products.add(new Product("Laptop", 60000));
        products.add(new Product("Mouse", 350));
        products.add(new Product("Keyboard", 800));
        products.add(new Product("Monitor", 7000));
        products.add(new Product("Flash Drive", 300));
        products.add(new Product("Headphones", 1500));

        IO.print("Enter minimum price filter: ");
        double minPrice = sc.nextDouble();

        long expensiveCount = products.stream()
                .filter(p -> p.price > minPrice)
                .count();

        IO.println("Number of products above " + minPrice + ": " + expensiveCount);
    }
}
