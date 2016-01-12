package com.ScheduleManager.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.ScheduleManager.dao.impl.DAOConfigTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * @author Alex Bilobrovets
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = { DAOConfigTest.class })
public class ApiControllerTest
{
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void setup()
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void testLogin() throws Exception
    {
        this.mockMvc.perform(get("/login?username=alexb&password=123").accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json"))
                    .andExpect(jsonPath("$.username").value("alexb"))
                    .andExpect(jsonPath("$.name").value("Alex Bilobrovets"));

        this.mockMvc.perform(get("/login?username=alexb&password=1234").accept("application/json"))
                    .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLogout() throws Exception
    {

    }

    @Test
    public void testCalendar() throws Exception
    {
        MockHttpServletRequestBuilder request;

        request = get("/calendar?userId=1").accept("application/json").sessionAttr("id", 2);
        this.mockMvc.perform(request)
                    .andExpect(status().isUnauthorized());

        request = get("/calendar?userId=1").accept("application/json");
        this.mockMvc.perform(request)
                    .andExpect(status().isUnauthorized());

        request = get("/calendar?userId=1").accept("application/json").sessionAttr("id", 1);
        this.mockMvc.perform(request)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json"))
                    .andExpect(jsonPath("$[0]['title']").value("CGM Scheduler Backend"))
                    .andExpect(jsonPath("$[0]['add_day']").value(true))
                    .andExpect(jsonPath("$[0]['type']").value("Development"))
                    .andExpect(jsonPath("$[0]['start']").value("2016-01-11 12:30:00"))
                    .andExpect(jsonPath("$[0]['end']").value(""));
    }
}