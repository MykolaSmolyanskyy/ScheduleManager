package com.ScheduleManager.dao.impl;

import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ScheduleManager.dao.EventDAO;
import com.ScheduleManager.model.Event;

import static org.junit.Assert.assertTrue;

/**
 * @author Alex Bilobrovets
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DAOConfigTest.class)
public class JdbcEventDAOTest
{
    @Autowired
    private EventDAO eventDAO;

    @Test
    public void testFindUserEvents() throws Exception
    {
        List<Event> events = eventDAO.findUserEvents(1);

        Optional<Event> oEvent = events.stream().filter(e -> e.getTitle().equals("CGM Scheduler Backend")).findFirst();

        assertTrue(oEvent.isPresent() && oEvent.get().getId() == 1);
    }
}