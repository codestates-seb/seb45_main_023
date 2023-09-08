package com.marbleUs.marbleUs.member.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.comment.entity.Comment;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.common.tools.enums.UserLocations;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
//@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class Member extends Auditable {


//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    @EqualsAndHashCode.Include
//    private Long id;


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



    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Blog> myBlogs = new ArrayList<>();

    @ElementCollection
    private List<Long> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Follow> follows = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Follower> followers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberMission> myMissions = new ArrayList<>();


    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> myComments = new ArrayList<>();



    //개인정보

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private List<Image> profilePics = new ArrayList<>();

    @Column(nullable = false, length = 50)
    private String nationality;

    @Column(nullable = false)
    private LocalDate birth;

    public void addBlogs(Blog blog) {
        if (blog.getMember() != this) blog.setMember(this);
        myBlogs.add(blog);
    }


    //조인 쿼리수를 줄이기 위해 조인테이블 객체 매핑이 아닌 아이디 값만 저장
    public void addBookMarks(Blog blog) {
        if (myBlogs.contains(blog)) throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED_BOOKMARK);
        if (bookmarks.contains(blog.getId())) throw new BusinessLogicException(ExceptionCode.ALREADY_BOOKMARKED);
        bookmarks.add(blog.getId());
    }
    public void deleteBookmark(Long id) {

        if (!bookmarks.contains(id)) throw new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND);
        bookmarks.removeIf(blogId -> blogId.equals(id));
    }



    public void addProfilePic(Image profilePic){
        if (profilePic.getMember() != this) profilePic.setMember(this);
        profilePics.add(profilePic);
    }

    public void addMyComment(Comment comment){
        if (comment.getMember() != this) comment.setMember(this);
        myComments.add(comment);
    }

    public void addLocation(UserLocations currentLocation){
        visitedCities.add(currentLocation);
    }

    public void addFollow(Follow follow){
        for (Follow member:follows) {
            if (member.getFollowedMember().equals(follow.getFollowedMember())) break;
            follows.add(follow);
        }
    }

    public void addFollower(Follower follower){
        for (Follower member:followers) {
            if (member.getFollower().equals(follower.getFollower())) break;
            followers.add(follower);
        }
    }

    public void unFollow(Follow follow){
        for (Follow member:follows) {
            if (member.getFollowedMember().equals(follow.getFollowedMember())) {
            follows.remove(follow);
            }
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public void deleteFollower(Follower follower) {
        for (Follow member : follows) {
            if (member.getFollowedMember().equals(follower.getFollower())) {
            followers.remove(follower);
            }
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public enum Status{

        MEMBER_ACTIVE("member is active"),

        MEMBER_DEACTIVATED("member is deactivated");

        @Getter
        private String description;

        Status(String description) {
            this.description = description;
        }
    }


}
