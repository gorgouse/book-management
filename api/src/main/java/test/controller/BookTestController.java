package test.controller;

import bm.BookServiceApplication;
import cn.hutool.json.JSONUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: Gorgeous
 * @Date: 2024/3/5
 * @Description:
 * @Version: 1.0
 */
@SpringBootTest(classes = BookServiceApplication.class)
@AutoConfigureMockMvc
public class BookTestController {

    @Resource
    MockMvc mockMvc;

    @Test
    public void testBookAdding() throws Exception{
        Map<String, Object> params = new HashMap<>();
        params.put("title","book0305");
        params.put("author","gorgeous");
        params.put("pubYear","2024");
        params.put("isbn","1234567890123 aa");
        mockMvc.perform(MockMvcRequestBuilders.post("/book/addBook")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JSONUtil.toJsonStr(params)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testBookDelete() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.delete("/book/deleteBook")
                .param("id", "17")
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testBookUpdate() throws Exception{
        Map<String, Object> params = new HashMap<>();
        params.put("id","18");
        params.put("title","666");
        params.put("author","xmt");
        params.put("pubYear","2025");
        params.put("isbn","1234567890123");
        mockMvc.perform(MockMvcRequestBuilders.patch("/book/updateBook")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JSONUtil.toJsonStr(params)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testRetrieveBookById() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/book/retrieveBookById/18")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(MockMvcResultMatchers.status().isOk());
    }


}
