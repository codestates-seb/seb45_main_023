package com.marbleUs.marbleUs.auth.service;

import com.marbleUs.marbleUs.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.exception.BusinessLogicException;
import com.marbleUs.marbleUs.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

import static org.apache.tomcat.jni.SSL.setPassword;

@Component
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    private class MemberDetails extends Member implements UserDetails {
        public MemberDetails(Member findMember) {
                setMemberId(findMember.getMemberId());
                setEmail(findMember.getEmail());
                setPassword(findMember.getPassword());
                setRoles(findMember.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }


        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
