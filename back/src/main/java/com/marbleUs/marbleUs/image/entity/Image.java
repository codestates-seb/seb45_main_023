package com.marbleUs.marbleUs.image.entity;

import com.marbleUs.marbleUs.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class Image extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500,nullable = false)
    private String name;

    @Column(length = 500,nullable = false)
    private String path;
}
