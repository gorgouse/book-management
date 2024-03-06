package test.service;

import bm.BookServiceApplication;
import bm.entity.dto.book.BookAddingDTO;
import bm.entity.dto.book.BookUpdatingDTO;
import bm.entity.model.Book;
import bm.exception.GlobalException;
import bm.service.BookService;
import cn.hutool.json.JSONUtil;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/5
 * @Description:
 * @Version: 1.0
 */
@SpringBootTest(classes = BookServiceApplication.class)
public class BookTestService {

    private static final Logger log = LoggerFactory.getLogger(BookTestService.class);

    @Autowired
    private BookService bookService;

    @Test
    public void testBookAdding() {
        BookAddingDTO bookAddingDTO = BookAddingDTO.builder().author("gorgeous").pubYear("2024").isbn("1234567890123").title("Love and Pleace").build();
        boolean addRes = bookService.addBook(bookAddingDTO);
        log.info("add book operation is " + String.valueOf(addRes));
    }

    @Test
    public void testBookDelete() {
        boolean deleteRes = bookService.deleteBook(20L);
        log.info("delete book operation is " + String.valueOf(deleteRes));
    }

    @Test
    public void testBookUpdate() {
        BookUpdatingDTO bookUpdatingDTO = BookUpdatingDTO.builder().id(21L).author("gorgeous2").pubYear("2025").isbn("1234567890124").title("Love and Pleace-2").build();
        int deleteRes = bookService.updateBook(bookUpdatingDTO);
        log.info("delete book operation is " + (deleteRes > 0));
    }

    @Test
    public void testRetrieveBookById() {
        Book book = bookService.retrieveBookById(21L);
        log.info("book: " + book);
    }


}
