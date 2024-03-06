package bm.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/6
 * @Description:
 * @Version: 1.0
 */
@NoArgsConstructor
@Data
public class BusinessException extends RuntimeException {

    private Integer code = 500;

    private String msg;

    public BusinessException(String msg){
        this.msg = msg;
    }
}
