package bm.controller;

import bm.entity.dto.book.BookAddingDTO;
import bm.entity.dto.book.BookUpdatingDTO;
import bm.entity.model.Book;
import bm.service.BookService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.websocket.server.PathParam;
import java.util.List;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
@CrossOrigin
@RestController
@RequestMapping("/book")
public class BookController {

    @Resource
    private BookService bookService;

    /**
     * Create a new book
     * @param bookAddingDTO
     * @return
     */
    @PostMapping("/addBook")
    public boolean addBook( @RequestBody @Validated BookAddingDTO bookAddingDTO){
        return bookService.addBook(bookAddingDTO);
    }

    /**
     * Delete a book
     * @param id
     * @return
     */
    @DeleteMapping("/deleteBook")
    public boolean deleteBook(@PathParam("id") Long id){
        return bookService.deleteBook(id);
    }

    /**
     * Update a book's details
     * @param bookUpdatingDTO
     * @return
     */
    @PatchMapping("/updateBook")
    public int updateBook(@RequestBody @Validated BookUpdatingDTO bookUpdatingDTO){
        return bookService.updateBook(bookUpdatingDTO);
    }

    /**
     * Retrieve a book by ID
     * @param id
     * @return
     */
    @GetMapping("/retrieveBookById/{id}")
    public Book retrieveBookById( @PathVariable("id") Long id){
        return bookService.retrieveBookById(id);
    }

    /**
     * Retrieve all books
     * @param
     * @return
     */
    @GetMapping("/retrieveBookList")
    public List<Book> retrieveBookList(){
        return bookService.retrieveBookList();
    }

}
