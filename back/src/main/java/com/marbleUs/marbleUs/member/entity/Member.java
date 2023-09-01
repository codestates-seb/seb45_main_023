package com.marbleUs.marbleUs.member.entity;

import com.marbleUs.marbleUs.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.image.Image;
import com.marbleUs.marbleUs.image.MemberImage;
import com.marbleUs.marbleUs.systemUtils.Stamps;
import com.marbleUs.marbleUs.systemUtils.UserLocations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //create 시 기본 자동 생성 추후 수정가능
    @Column(length = 15, nullable = false)
    private String nickname;

    @Column(length = 100, nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    //for Game play
    //현재 로케이션이 추가될때 visitedCities 에도 추가

    private int level = 1;

    @Enumerated(EnumType.STRING)
    private UserLocations currentLocation = UserLocations.BLOCK_0;

    @ElementCollection
    private List<UserLocations> visitedCities = new ArrayList<>();

    @ElementCollection
    private List<Stamps> myStamps = new ArrayList<>();

    public void addLocation(UserLocations currentLocation){
        visitedCities.add(currentLocation);
    }


    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Blog> myBlogs = new ArrayList<>();


//    @OneToMany(mappedBy = "member")
//    private List<Mission> missions = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Blog> bookmarks = new ArrayList<>();



    //개인정보

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private List<MemberImage> profilePics = new ArrayList<>();

    @Column(nullable = false, length = 50)
    private String nationality;

    @Column(nullable = false)
    private LocalDate birth;

    public void addBlogs(Blog blog) {
        if (blog.getMember() != this) blog.setMember(this);
        myBlogs.add(blog);
    }

    public void addBookMarks(Blog blog) {
        if (blog.getMember() != this) blog.setMember(this);
        bookmarks.add(blog);
    }

    public void addProfilePic(MemberImage profilePic){
        if (profilePic.getMember() != this) profilePic.setMember(this);
        profilePics.add(profilePic);
    }
}