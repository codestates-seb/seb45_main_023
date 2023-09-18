package com.marbleUs.marbleUs.image.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MemberImage extends Auditable {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
}
