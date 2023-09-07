package com.marbleUs.marbleUs.member.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Follow extends Auditable {
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "followed_id")
    private Member followedMember;

}
