package com.ScheduleManager.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * @author Alex Bilobrovets
 */
public class AppInitializer implements WebApplicationInitializer
{
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException
    {
        AnnotationConfigWebApplicationContext springContext = new AnnotationConfigWebApplicationContext();
        springContext.register(AppConfig.class);

        ServletRegistration.Dynamic springServlet = servletContext.addServlet("dispatcher", new DispatcherServlet(springContext));
        springServlet.setLoadOnStartup(1);
        springServlet.addMapping("/api/*");

        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);

        servletContext.addFilter("encodingFilter", encodingFilter).addMappingForUrlPatterns(null, false, "/*");
    }
}