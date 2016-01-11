package com.ScheduleManager.controller;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ScheduleManager.dao.EventDAO;
import com.ScheduleManager.dao.UserDAO;
import com.ScheduleManager.model.Event;
import com.ScheduleManager.model.User;

/**
 * @author Alex Bilobrovets
 */
@Controller
public class ApiController
{
    private static final SimpleDateFormat DATE_TIME = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private EventDAO eventDAO;

    //@ResponseBody
    //@RequestMapping(value = "/login", produces = "application/json", consumes= MediaType.APPLICATION_JSON_UTF8_VALUE)
    //public String login(@RequestBody Credentials credentials,
    //                    HttpServletResponse response,
    //                    HttpSession session)
    //{

    @ResponseBody
    @RequestMapping(value = "/login", produces = "application/json")
    public String login(@RequestParam("username") String login,
                        @RequestParam("password") String password,
                        HttpServletResponse response,
                        HttpSession session)
    {
        Optional<User> oUser = userDAO.findUserByLogin(login);

        if (!oUser.isPresent())
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        User user = oUser.get();

        if (!user.getPwd().equals(password))
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        session.setAttribute("id", user.getId());

        Cookie cookieId = new Cookie("id", String.valueOf(user.getId()));
        Cookie cookieUsername = new Cookie("username", user.getLogin());

        cookieId.setMaxAge(60 * 10);
        cookieId.setDomain("127.0.0.1");
        cookieId.setPath("/");
        cookieId.setHttpOnly(false);
        cookieId.setSecure(false);

        cookieUsername.setMaxAge(60 * 10);
        cookieUsername.setDomain("127.0.0.1");
        cookieUsername.setPath("/");
        cookieUsername.setHttpOnly(false);
        cookieUsername.setSecure(false);

        response.addCookie(cookieId);
        response.addCookie(cookieUsername);

        return Json.createObjectBuilder()
                   .add("username", user.getLogin())
                   .add("name", user.getName())
                   .build()
                   .toString();
    }

    @ResponseBody
    @RequestMapping(value = "/logout", produces = "application/json")
    public void logout(HttpSession session)
    {
        session.invalidate();
    }

    @ResponseBody
    @RequestMapping(value = "/calendar", produces = "application/json")
    public String calendar(@RequestParam("userId") int userId,
                           HttpServletResponse response,
                           HttpSession session)
    {
        Integer id = (Integer) session.getAttribute("id");
        if (id == null || id != userId)
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        Optional<User> oUser = userDAO.findUserById(userId);

        if (!oUser.isPresent())
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        List<Event> events = eventDAO.findUserEvents(oUser.get().getId());

        List<JsonObject> jsonObjects = events.stream().map(
          e ->
            Json.createObjectBuilder()
                .add("title", e.getTitle())
                .add("add_day", e.isAllDay())
                .add("type", e.getType())
                .add("start", DATE_TIME.format(e.getStartDate()))
                .add("end", e.getEndDate() == null ? "" : DATE_TIME.format(e.getEndDate()))
                .build()
        ).collect(Collectors.toList());

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        jsonObjects.forEach(jsonArrayBuilder::add);

        return jsonArrayBuilder.build().toString();
    }
}
