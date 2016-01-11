package cgm.ScheduleManager.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import cgm.ScheduleManager.dao.UserDAO;
import cgm.ScheduleManager.model.User;

/**
 * @author Alex Bilobrovets
 */
@Component
public class JdbcUserDAO implements UserDAO
{
    @Autowired
    @Qualifier("dataSource")
    private JdbcTemplate jdbcTemplate;

    @Override
    public Optional<User> findUserById(int id)
    {
        String sql = " SELECT * FROM user WHERE id = ?";

        User user = jdbcTemplate.query(sql, this::rsToUser, id);

        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findUserByLogin(String login)
    {
        String sql = " SELECT * FROM user WHERE login = ?";

        User user = jdbcTemplate.query(sql, this::rsToUser, login);

        return Optional.ofNullable(user);
    }

    private User rsToUser(ResultSet rs) throws SQLException
    {
        if (!rs.next())
            return null;

        User u = new User();

        u.setId(rs.getInt("id"));
        u.setLogin(rs.getString("login"));
        u.setPwd(rs.getString("pwd"));
        u.setName(rs.getString("name"));

        return u;
    }
}
