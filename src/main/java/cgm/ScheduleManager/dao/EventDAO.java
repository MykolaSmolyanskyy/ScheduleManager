package cgm.ScheduleManager.dao;

import java.util.List;

import cgm.ScheduleManager.model.Event;

/**
 * @author Alex Bilobrovets
 */
public interface EventDAO
{
    List<Event> findUserEvents(int userId);
}
