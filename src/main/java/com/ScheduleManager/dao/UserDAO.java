package com.ScheduleManager.dao;

import java.util.Optional;

import com.ScheduleManager.model.User;

/**
 * @author Alex Bilobrovets
 */
public interface UserDAO {
    Optional<User> findUserById(int id);

    Optional<User> findUserByLogin(String login);
}
