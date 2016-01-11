package com.ScheduleManager.dao;

import java.util.List;

import com.ScheduleManager.model.Event;

/**
 * @author Alex Bilobrovets
 */
public interface EventDAO
{
    List<Event> findUserEvents(int userId);
}
