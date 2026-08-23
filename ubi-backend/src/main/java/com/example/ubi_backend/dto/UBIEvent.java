package com.example.ubi_backend.dto;

import java.util.Map;

public class UBIEvent {

    private String action_name;
    private String timestamp;
    private String client_id;
    private String session_id;
    private String user_query;
    private Map<String, Object> event_attributes;

    public String getAction_name() {
        return action_name;
    }

    public void setAction_name(String action_name) {
        this.action_name = action_name;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getUser_query() {
        return user_query;
    }

    public void setUser_query(String user_query) {
        this.user_query = user_query;
    }

    public Map<String, Object> getEvent_attributes() {
        return event_attributes;
    }

    public void setEvent_attributes(Map<String, Object> event_attributes) {
        this.event_attributes = event_attributes;
    }

    @Override
    public String toString() {
        return "UBIEvent{" +
                "action_name='" + action_name + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", client_id='" + client_id + '\'' +
                ", session_id='" + session_id + '\'' +
                ", user_query='" + user_query + '\'' +
                ", event_attributes=" + event_attributes +
                '}';
    }
}