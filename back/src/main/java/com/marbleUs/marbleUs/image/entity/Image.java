package com.marbleUs.marbleUs.image.entity;


import com.marbleUs.marbleUs.common.BaseEntity;
import com.marbleUs.marbleUs.common.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Image extends BaseEntity {


    @Column(length = 500,nullable = false)
    private String name;

    @Column(length = 500,nullable = false)
    private String path;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;
}
