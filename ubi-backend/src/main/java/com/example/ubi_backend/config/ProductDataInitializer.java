package com.example.ubi_backend.config;

import com.example.ubi_backend.entity.Product;
import com.example.ubi_backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductDataInitializer {

    @Bean
    CommandLineRunner loadProducts(ProductRepository repository) {

        return args -> {

            if (repository.count() == 0) {

                repository.saveAll(List.of(

                        new Product(
                                1,
                                "Dell Inspiron 15",
                                "Laptop",
                                52990,
                                "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                2,
                                "HP Pavilion 14",
                                "Laptop",
                                45990,
                                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                3,
                                "Lenovo IdeaPad 3",
                                "Laptop",
                                39990,
                                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                4,
                                "Apple MacBook Air M1",
                                "Laptop",
                                89990,
                                "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800"
                        ),

                        new Product(
                                5,
                                "Java Programming In Depth",
                                "Book",
                                999,
                                "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                6,
                                "Spring Boot In Action",
                                "Book",
                                1199,
                                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                7,
                                "Logitech MX Master 3",
                                "Mouse",
                                7499,
                                "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
                        ),

                        new Product(
                                8,
                                "Mechanical Keyboard K8",
                                "Keyboard",
                                4999,
                                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                        )
                ));

                System.out.println("Products inserted into MongoDB");
            }
        };
    }
}