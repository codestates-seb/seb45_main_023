package com.marbleUs.marbleUs.common.websocket.chat.repository;

import com.marbleUs.marbleUs.common.websocket.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.Map;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {
    @Query("SELECT c from ChatRoom c where c.roomId = :id")
    Optional<ChatRoom> findByUUID(String id);
}
