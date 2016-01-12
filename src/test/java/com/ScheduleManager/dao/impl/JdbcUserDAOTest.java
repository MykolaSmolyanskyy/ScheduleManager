package com.ScheduleManager.dao.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ScheduleManager.config.TestConfig;
import com.ScheduleManager.dao.UserDAO;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * @author Alex Bilobrovets
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
public class JdbcUserDAOTest
{
    @Autowired
    private UserDAO userDAO;

    @Test
    public void testFindUserById() throws Exception
    {
        assertTrue(userDAO.findUserById(1).isPresent());
        assertTrue(userDAO.findUserById(2).isPresent());
        assertFalse(userDAO.findUserById(3).isPresent());
    }

    @Test
    public void testFindUserByLogin() throws Exception
    {
        assertTrue(userDAO.findUserByLogin("alexb").isPresent());
        assertTrue(userDAO.findUserByLogin("nicks").isPresent());
        assertFalse(userDAO.findUserByLogin("nicks1").isPresent());
    }
}