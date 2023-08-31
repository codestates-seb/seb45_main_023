package com.marbleUs.marbleUs.blog.entity;

import com.marbleUs.marbleUs.audit.Auditable;
import com.marbleUs.marbleUs.comment.entity.Comment;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.cities.entity.City;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "blog")
public class Blog extends Auditable {

    @Id //Id 자동 생성
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "id")
    private Long blogId;

    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false, name = "body")
    private String body;

    @ElementCollection
    @Column(nullable = false, name = "tags")
    private List<String> tags;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    //외래키 부분 활성화완료
    @OneToMany(mappedBy = "blog")
    private List<Comment> comments = new ArrayList<>();



}