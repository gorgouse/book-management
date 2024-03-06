package bm.entity.dto.book;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/5
 * @Description:
 * @Version: 1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookAddingDTO {

    @NotBlank(message = "title can not be empty")
    private String title;

    @NotBlank(message = "author can not be empty")
    private String author;

    @NotBlank(message = "public year can not be empty")
    private String pubYear;

    @NotBlank(message = "isbn can not be empty")
    @Size(max = 13, min = 13, message = "error isbn")
    private String isbn;

}
