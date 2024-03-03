package bm.service.impl;

import bm.mapper.BookMapper;
import bm.model.Book;
import bm.service.BookService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements BookService {

    @Resource
    private BookMapper bookMapper;

    @Override
    public Book retrieveBookById( Long id ) {
        return bookMapper.selectById(id);
    }

    @Override
    public List<Book> retrieveBookList() {
        return bookMapper.selectList(null);
    }

    @Override
    public boolean addBook( Book book ) {
        return bookMapper.insert(book) > 0;
    }

    @Override
    public boolean deleteBook( Long id ) {
        return bookMapper.deleteById(id) > 0;
    }

    @Override
    public int updateBook( Book book ) {
        return bookMapper.updateById(book);
    }

}
