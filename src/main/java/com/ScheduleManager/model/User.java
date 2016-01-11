package com.ScheduleManager.model;

/**
 * @author Alex Bilobrovets
 */
public class User
{
    private int    id;
    private String login;
    private String pwd;
    private String name;

    public User()
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

    public String getLogin()
    {
        return login;
    }

    public void setLogin(String login)
    {
        this.login = login;
    }

    public String getPwd()
    {
        return pwd;
    }

    public void setPwd(String pwd)
    {
        this.pwd = pwd;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    @Override
    public String toString()
    {
        return String.format("User{id=%d, login='%s', pwd='%s', name='%s'}", id, login, pwd, name);
    }
}
