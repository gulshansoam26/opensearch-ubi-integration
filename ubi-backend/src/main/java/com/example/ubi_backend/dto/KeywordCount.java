package com.example.ubi_backend.dto;

public class KeywordCount {

    private String keyword;
    private long count;

    public KeywordCount(String keyword, long count) {
        this.keyword = keyword;
        this.count = count;
    }

    public String getKeyword() {
        return keyword;
    }

    public long getCount() {
        return count;
    }
}