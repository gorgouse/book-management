package bm.entity.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/1
 * @Description:
 * @Version: 1.0
 */
@Data
@TableName("t_book")
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("title")
    private String title;

    @TableField("author")
    private String author;

    @TableField("pub_year")
    private String pubYear;

    @TableField("isbn")
    private String isbn;

    @TableField("create_user")
    private String createUser;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_user")
    private String updateUser;

    @TableField("update_time")
    private LocalDateTime updateTime;

    @TableField("version")
    private Integer version;
}
