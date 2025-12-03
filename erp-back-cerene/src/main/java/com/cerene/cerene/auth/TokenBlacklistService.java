package com.cerene.cerene.auth;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    private final Map<String, Instant> blacklist = new ConcurrentHashMap<>();

    public void addToBlacklist(String token) {
        Instant expiration = Instant.now().plusSeconds(7200);
        blacklist.put(token, expiration);
    }

    public boolean isBlacklisted(String token) {
        Instant expiration = blacklist.get(token);
        if (expiration == null) {
            return false;
        }

        if (expiration.isBefore(Instant.now())) {
            blacklist.remove(token);
            return false;
        }

        return true;
    }

}
