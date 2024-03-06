package bm.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppResponse {

    private Integer status;

    private Object data;

    private String message;


    public static AppResponse response(Integer code, Object data, String msg) {
        return new AppResponse(code, data, msg);
    }

    public static AppResponse response( Object data ) {
        return new AppResponse(null, data, null);
    }

    /**
     * successful response
     * @param data
     * @return
     */
    public static AppResponse isOk(Object data) {
        return new AppResponse(200, data, "success");
    }



}
