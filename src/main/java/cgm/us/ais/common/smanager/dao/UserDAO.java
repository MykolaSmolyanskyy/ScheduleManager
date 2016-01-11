package cgm.us.ais.common.smanager.dao;

import java.util.Optional;

import cgm.us.ais.common.smanager.model.User;

/**
 * @author Alex Bilobrovets
 */
public interface UserDAO {
    Optional<User> findUserById(int id);

    Optional<User> findUserByLogin(String login);
}
