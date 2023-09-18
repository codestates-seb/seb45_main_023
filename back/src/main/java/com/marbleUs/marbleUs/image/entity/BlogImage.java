package com.marbleUs.marbleUs.image.entity;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class BlogImage extends Auditable {


    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
}
