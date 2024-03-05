package bm.aop;

import cn.hutool.json.JSONUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Objects;

/**
 * @Author: Gorgeous
 * @Date: 2023/10/16
 * @Description:
 * @Version: 1.0
 */
@Aspect
@Component
public class RequestLoggerAopConfig {

    @Resource
    private HttpServletRequest request;

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggerAopConfig.class);


    //切所有的请求
    @Pointcut("execution (* bm.controller.*.*(..))")
    public void requestInfoPointCut() {
    }

    /**
     * 打印请求参数格式
     */
    private void loggerParameter(JoinPoint point){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();
        logger.info("start===================================>");
        logger.info("【request URL】：{}", request.getRequestURL());
        logger.info("【request IP】：{}", request.getRemoteAddr());
        logger.info("【request class】：{}，【request method name】：{}", point.getSignature().getDeclaringTypeName(), point.getSignature().getName());
        logger.info("【request body】：{}，", JSONUtil.toJsonStr(point.getArgs()));
        Map<String, String[]> parameterMap = request.getParameterMap();
        logger.info("【request Parameter】：{}，", parameterMap);
        logger.info("end===================================>");

    }

    @Before(value = "requestInfoPointCut()")
    public void beforeAdvice( JoinPoint point) {
        loggerParameter(point);
    }


    @After(value = "requestInfoPointCut()")
    public void afterAdvice() {
        logger.info("receive request-->");
    }

}
