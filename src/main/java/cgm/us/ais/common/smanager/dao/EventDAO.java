package cgm.us.ais.common.smanager.dao;

import java.util.List;

import cgm.us.ais.common.smanager.model.Event;

/**
 * @author Alex Bilobrovets
 */
public interface EventDAO
{
    List<Event> findUserEvents(int userId);
}
