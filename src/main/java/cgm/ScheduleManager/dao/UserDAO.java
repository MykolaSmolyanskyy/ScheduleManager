package cgm.ScheduleManager.dao;

import java.util.Optional;

import cgm.ScheduleManager.model.User;

/**
 * @author Alex Bilobrovets
 */
public interface UserDAO {
    Optional<User> findUserById(int id);

    Optional<User> findUserByLogin(String login);
}
