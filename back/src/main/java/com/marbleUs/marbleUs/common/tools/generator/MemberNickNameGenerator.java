package com.marbleUs.marbleUs.common.tools;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class MemberNickNameGenerator implements NickNameGenerator{

    @Override
    public String randomNickNameGenerator(List<String> adjectives, List<String> animals) {
        Random random = new Random();
        int adjIndex = random.nextInt(adjectives.size());

        int animalIndex = random.nextInt(animals.size());
        String adjective = adjectives.get(adjIndex);
        String animal = animals.get(animalIndex);

        return adjective+animal;
    }
}
