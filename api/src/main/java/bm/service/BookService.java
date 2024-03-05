package bm.service;

import bm.entity.dto.book.BookAddingDTO;
import bm.entity.dto.book.BookUpdatingDTO;
import bm.entity.model.Book;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
public interface BookService extends IService<Book> {
    boolean addBook( BookAddingDTO bookAddingDTO );

    boolean deleteBook( Long id );

    int updateBook( BookUpdatingDTO bookUpdatingDTO );

    Book retrieveBookById( Long id );

    List<Book> retrieveBookList();
}
