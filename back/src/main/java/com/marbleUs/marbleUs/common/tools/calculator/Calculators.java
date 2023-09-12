package com.marbleUs.marbleUs.common.tools.calculator;

import com.marbleUs.marbleUs.common.tools.enums.UserLocations;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Calculators {
    public void memberLocationCalculator(Member findMember, UserLocations location) {
        if (findMember.getCurrentLocation() != location && findMember.getCurrentLocation().getNum()>= location.getNum()){
            memberLevelUp(findMember);
            findMember.setCurrentLocation(location);
            findMember.addLocation(location);
        }
    }

    public void memberLevelUp(Member findMember) {
        int currentLevel = findMember.getLevel() +1;
        findMember.setLevel(currentLevel);
    }
}
