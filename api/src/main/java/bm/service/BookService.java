package bm.service;

import bm.model.Book;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
public interface BookService extends IService<Book> {
    boolean addBook( Book book );

    boolean deleteBook( Long id );

    int updateBook( Book book );

    Book retrieveBookById( Long id );

    List<Book> retrieveBookList();
}
