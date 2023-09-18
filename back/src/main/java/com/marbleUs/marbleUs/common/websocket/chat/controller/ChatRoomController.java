package com.marbleUs.marbleUs.common.websocket.chat.controller;

import com.marbleUs.marbleUs.common.websocket.chat.entity.ChatRoom;
import com.marbleUs.marbleUs.common.websocket.chat.mapper.ChatRoomMapper;
import com.marbleUs.marbleUs.common.websocket.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService service;
    private final ChatRoomMapper mapper;

    @PostMapping("/room")
    public ResponseEntity postRoom(@RequestParam String name){
        ChatRoom chatRoom = service.createChatRoom(name);
        return new ResponseEntity<>(mapper.toChatRoomDto(chatRoom), HttpStatus.CREATED);
    }

        @GetMapping("/room")
        public String rooms(Model model) {
            return "/chat/room";
        }
        // 모든 채팅방 목록 반환
        @GetMapping("/rooms")
        @ResponseBody
        public List<ChatRoom> room(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
            return service.findAllRoom(page,size).getContent();
        }

        // 채팅방 입장 화면
        @GetMapping("/room/enter/{roomId}")
        public String roomDetail(Model model, @PathVariable String roomId) {
            model.addAttribute("roomId", roomId);
            return "/chat/roomdetail";
        }
        // 특정 채팅방 조회
        @GetMapping("/room/{roomId}")
        @ResponseBody
        public ChatRoom roomInfo(@PathVariable String roomId) {
            return service.findRoomById(roomId);
        }
    }

