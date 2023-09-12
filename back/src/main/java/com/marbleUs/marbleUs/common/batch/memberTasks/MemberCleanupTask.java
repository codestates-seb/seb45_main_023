package com.marbleUs.marbleUs.common.batch.memberTasks;

import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberCleanupTask {

    private final MemberRepository memberRepository;


    @Scheduled(cron = "0 0 0 1 1 */5") //every 5years
//    @Scheduled(cron = "0 */2 * * * *")
    public void deleteInactiveUsers() {
        List<Member> membersToDelete = memberRepository.findAllByMemberStatus(Member.Status.MEMBER_INACTIVE);
        memberRepository.deleteAll(membersToDelete);
    }
}
