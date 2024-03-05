package bm.entity.dto.book;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/5
 * @Description:
 * @Version: 1.0
 */
public class BookUpdatingDTO {

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
