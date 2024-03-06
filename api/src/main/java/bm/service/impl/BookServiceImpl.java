package bm.service.impl;

import bm.entity.dto.book.BookAddingDTO;
import bm.entity.dto.book.BookUpdatingDTO;
import bm.exception.BusinessException;
import bm.mapper.BookMapper;
import bm.entity.model.Book;
import bm.service.BookService;
import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

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
        if(Objects.isNull(id)){
            throw new BusinessException("id can not be empty");
        }
        Book book = bookMapper.selectById(id);
        if(Objects.isNull(book)){
            throw new BusinessException("no book id such like "+ id);
        }
        return book;
    }

    @Override
    public List<Book> retrieveBookList() {
        return bookMapper.selectList(null);
    }

    @Override
    public boolean addBook( BookAddingDTO bookAddingDTO ) {
        Book book = BeanUtil.toBean(bookAddingDTO, Book.class);
        return bookMapper.insert(book) > 0;
    }

    @Override
    public boolean deleteBook( Long id ) {
        if(Objects.isNull(id)){
            throw new BusinessException("id can not be empty");
        }
        return bookMapper.deleteById(id) > 0;
    }

    @Override
    public int updateBook( BookUpdatingDTO bookUpdatingDTO ) {
        Book book = BeanUtil.copyProperties(bookUpdatingDTO, Book.class);
        return bookMapper.updateById(book);
    }

}
