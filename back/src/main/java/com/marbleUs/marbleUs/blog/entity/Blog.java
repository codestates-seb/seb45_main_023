package com.marbleUs.marbleUs.blog.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.comment.entity.Comment;
//import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "blog")
public class Blog extends Auditable {



    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false, name = "body")
    private String body;

    private Long views = 0L;

    @ElementCollection
    @Column(nullable = false, name = "tags")
    private List<String> tags;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

//    @OneToMany(mappedBy = "blog",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
//    private List<Image> images = new ArrayList<>();


    @OneToMany(mappedBy = "blog",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();


    public void addComment(Comment comment){
        if (comment.getBlog() != this) comment.setBlog(this);
        comments.add(comment);
    }
//    public void addBlogImage(Image image){
//        if (image.getBlog() != this) image.setBlog(this);
//        images.add(image);
//    }

}
