package com.marbleUs.marbleUs.comment.entity;


import com.marbleUs.marbleUs.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동생성
    @Column
    private Long commentId;

    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;







}
