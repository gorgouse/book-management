package bm.controller;

import bm.model.Book;
import bm.service.BookService;
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
     * @param book
     * @return
     */
    @PostMapping("/addBook")
    public boolean addBook( @RequestBody Book book){
        return bookService.addBook(book);
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
     * @param book
     * @return
     */
    @PatchMapping("/updateBook")
    public int updateBook(@RequestBody Book book){
        return bookService.updateBook(book);
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
