package com.marbleUs.marbleUs.common.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class RedisServiceUtil {

    private final StringRedisTemplate stringRedisTemplate;

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setDateExpire(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public long expirationSecondGenerator(Instant now, Instant dueDate){
        long secondsBetween = ChronoUnit.SECONDS.between(now,dueDate);
        return secondsBetween;
    }

    public void deleteData(String key){
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(key))) stringRedisTemplate.delete(key);
    }
}
