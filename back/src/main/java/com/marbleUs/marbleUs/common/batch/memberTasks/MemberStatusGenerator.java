package com.marbleUs.marbleUs.common.batch.memberTasks;

import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MemberStatusGenerator {
    private final MemberRepository repository;




    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Seoul")// Run every year
//    @Scheduled(cron ="0 * * * * *")
    private void updateMemberStatus() {
        LocalDateTime thresholdDate = LocalDateTime.now().minus(1, ChronoUnit.YEARS); //inactive member if last login date is passed more than 1 year
//       LocalDateTime thresholdDate = LocalDateTime.now().minus(1,ChronoUnit.MINUTES);
//        if (lastLogin.isBefore(thresholdDate)){

        List<Member> members = repository.findAllByLastLogin(thresholdDate);
        members.stream().map(m ->{
            m.setMemberStatus(Member.Status.MEMBER_INACTIVE);
            repository.save(m);
            return m;
        }).collect(Collectors.toList());

//        }
    }
}
