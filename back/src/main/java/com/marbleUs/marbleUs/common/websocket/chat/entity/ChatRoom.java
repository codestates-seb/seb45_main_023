package com.marbleUs.marbleUs.common.websocket.chat.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class ChatRoom extends Auditable {

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String name;
}
