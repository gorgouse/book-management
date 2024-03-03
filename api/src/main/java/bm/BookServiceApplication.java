package bm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
@SpringBootApplication
@MapperScan("bm.mapper")
public class BookServiceApplication {

    public static void main( String[] args ) {
        SpringApplication.run(BookServiceApplication.class);
    }
}
