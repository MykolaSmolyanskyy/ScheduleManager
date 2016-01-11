package cgm.ScheduleManager.model;

import java.util.Date;

/**
 * @author Alex Bilobrovets
 */
public class Event
{
    private int     id;
    private User    user;
    private String  title;
    private boolean allDay;
    private String  type;
    private Date    startDate;
    private Date    endDate;

    public Event()
    {
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public boolean isAllDay()
    {
        return allDay;
    }

    public void setAllDay(boolean allDay)
    {
        this.allDay = allDay;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public Date getStartDate()
    {
        return startDate;
    }

    public void setStartDate(Date startDate)
    {
        this.startDate = startDate;
    }

    public Date getEndDate()
    {
        return endDate;
    }

    public void setEndDate(Date endDate)
    {
        this.endDate = endDate;
    }

    @Override
    public String toString()
    {
        return "Event{" +
          "id=" + id +
          ", user=" + user +
          ", title='" + title + '\'' +
          ", allDay=" + allDay +
          ", type='" + type + '\'' +
          ", startDate=" + startDate +
          ", endDate=" + endDate +
          '}';
    }
}
