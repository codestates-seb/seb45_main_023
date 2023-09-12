package com.marbleUs.marbleUs.common.websocket.chat.mapper;

import com.marbleUs.marbleUs.common.websocket.chat.dto.ChatRoomDto;
import com.marbleUs.marbleUs.common.websocket.chat.entity.ChatRoom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatRoomDto toChatRoomDto(ChatRoom chatRoom);
}
