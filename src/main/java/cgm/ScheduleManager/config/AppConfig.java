package cgm.ScheduleManager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import cgm.ScheduleManager.dao.EventDAO;
import cgm.ScheduleManager.dao.UserDAO;
import cgm.ScheduleManager.dao.impl.JdbcEventDAO;
import cgm.ScheduleManager.dao.impl.JdbcUserDAO;

/**
 * @author Alex Bilobrovets
 */
@Configuration
@EnableWebMvc
@ComponentScan("cgm.ScheduleManager")
public class AppConfig
{
    @Bean
    public UserDAO userDAO()
    {
        return new JdbcUserDAO();
    }

    @Bean
    public EventDAO eventDAO()
    {
        return new JdbcEventDAO();
    }

    @Bean
    public JdbcTemplate dataSource()
    {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        dataSource.setUrl("jdbc:h2:file:~/db;USER=user;PASSWORD=pwd");

        // NOTE: only for demonstration purposes we initialize tables here
        // NOTE: simple db structure
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.execute("DROP TABLE IF EXISTS user");
        jdbcTemplate.execute("CREATE TABLE user (id INT PRIMARY KEY, login VARCHAR(255) UNIQUE, pwd VARCHAR(255), name VARCHAR(255))");
        jdbcTemplate.execute("INSERT INTO user VALUES(1, 'alexb', '123', 'Alex Bilobrovets')");
        jdbcTemplate.execute("INSERT INTO USER VALUES(2, 'nicks', '111', 'Nick Smolyanskiy')");

        jdbcTemplate.execute("DROP TABLE IF EXISTS event_type");
        jdbcTemplate.execute("CREATE TABLE event_type (id INT PRIMARY KEY, name VARCHAR(64))");
        jdbcTemplate.execute("INSERT INTO event_type VALUES(1, 'Development')");
        jdbcTemplate.execute("INSERT INTO event_type VALUES(2, 'Free Time')");
        jdbcTemplate.execute("INSERT INTO event_type VALUES(3, 'Meeting')");

        jdbcTemplate.execute("DROP TABLE IF EXISTS event");
        jdbcTemplate.execute("CREATE TABLE event (id INT PRIMARY KEY, user_id INT, title VARCHAR(255), all_day TINYINT, type_id INT, start_date DATETIME, end_date DATETIME)");

        jdbcTemplate.execute("CREATE INDEX idx_event_user_id ON event(user_id)");

        jdbcTemplate.execute("INSERT INTO event VALUES(1, 1, 'CGM Scheduler Backend', '1', 1, '2016-01-11 12:30:00', null)");
        jdbcTemplate.execute("INSERT INTO event VALUES(2, 1, 'Lunch', '0', 2, '2016-01-11 12:30:00', '2016-01-11 13:30:00')");
        jdbcTemplate.execute("INSERT INTO event VALUES(3, 1, 'Meeting', '0', 3, '2016-01-11 15:10:00', '2016-01-11 15:40:00')");

        jdbcTemplate.execute("INSERT INTO event VALUES(4, 2, 'CGM Scheduler Frontend', '1', 1, '2016-01-11 12:30:00', null)");
        jdbcTemplate.execute("INSERT INTO event VALUES(5, 2, 'Lunch', '0', 2, '2016-01-11 13:15:00', '2016-01-11 14:15:00')");

        return jdbcTemplate;
    }
}
