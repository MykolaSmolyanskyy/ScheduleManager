package cgm.us.ais.common.smanager.dao.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import cgm.us.ais.common.smanager.dao.EventDAO;
import cgm.us.ais.common.smanager.dao.UserDAO;
import cgm.us.ais.common.smanager.model.Event;
import cgm.us.ais.common.smanager.model.User;

/**
 * @author Alex Bilobrovets
 */
@Component
public class JdbcEventDAO implements EventDAO
{
    @Autowired
    @Qualifier("dataSource")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserDAO userDAO;

    @Override
    public List<Event> findUserEvents(int userId)
    {
        Optional<User> oUser = userDAO.findUserById(userId);

        if (!oUser.isPresent())
            return Collections.emptyList();

        String sql = "SELECT e.id, e.title, e.all_day, et.name \"type_name\", e.start_date, e.end_date FROM event AS e LEFT JOIN event_type AS et ON e.type_id = et.id WHERE e.user_id = ?";

        return jdbcTemplate.query(
          sql, (rs, rowNum) -> {
              Event e = new Event();

              e.setId(rs.getInt("id"));
              e.setUser(oUser.get());
              e.setTitle(rs.getString("title"));
              e.setAllDay(rs.getBoolean("all_day"));
              e.setType(rs.getString("type_name"));
              e.setStartDate(rs.getTimestamp("start_date"));
              e.setEndDate(rs.getTimestamp("end_date"));

              return e;
          }
        , userId);
    }
}
