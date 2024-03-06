package bm.exception;

import bm.utils.AppResponse;
import com.alibaba.fastjson2.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author: Gorgeous
 * @Date: 2023/11/27
 * @Description:
 * @Version: 1.0
 */
@RestControllerAdvice
public class GlobalException {

    private static final Logger log = LoggerFactory.getLogger(GlobalException.class);

    /**
     * params validation exception handler
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public void handleMethodArgumentNotValidException( HttpServletResponse response, MethodArgumentNotValidException e ) throws IOException {
        String errMsg = e.getBindingResult().getFieldError().getDefaultMessage();
        AppResponse result = AppResponse.response(HttpStatus.BAD_REQUEST.value(),null, errMsg);
        String jsonString = JSON.toJSONString(result);
        response.getWriter().print(jsonString);
    }



}
