package com.marbleUs.marbleUs.common.websocket.chat.service;

import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.common.websocket.chat.entity.ChatRoom;
import com.marbleUs.marbleUs.common.websocket.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRoomRepository repository;



        public Page<ChatRoom> findAllRoom(int page, int size) {
            // 채팅방 생성순서 최근 순으로 반환
           Page<ChatRoom> chatRooms = repository.findAll(PageRequest.of(page-1,size));
            return chatRooms;
        }

        public ChatRoom findRoomById(String id) {
            return repository.findByUUID(id).orElseThrow(()->new BusinessLogicException(ExceptionCode.CHATROOM_NOT_EXIST));
        }

        public ChatRoom createChatRoom(String name) {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setName(name);
            chatRoom.setRoomId(UUID.randomUUID().toString());

            return repository.save(chatRoom);
        }
    }

