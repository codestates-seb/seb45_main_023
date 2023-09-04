package com.marbleUs.marbleUs.comment.entity;



import com.marbleUs.marbleUs.common.BaseEntity;
import com.marbleUs.marbleUs.common.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Comment extends BaseEntity {



    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;





}
