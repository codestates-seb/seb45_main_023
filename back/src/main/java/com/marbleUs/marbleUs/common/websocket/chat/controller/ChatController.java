package com.marbleUs.marbleUs.common.websocket.chat.controller;

//import com.marbleUs.marbleUs.common.websocket.chat.service.ChatRoomService;
import com.marbleUs.marbleUs.common.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.websocket.chat.dto.ChatMessage;
import com.marbleUs.marbleUs.common.websocket.chat.mapper.ChatRoomMapper;
import com.marbleUs.marbleUs.common.websocket.chat.service.ChatRoomService;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final JwtTokenizer tokenizer;
    private final MemberService memberService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message, @Header("Authorization") String authorization) {

        String jws = authorization.replace("Bearer ", "").toString();
        String base64EncodedSecretKey = tokenizer.encodedBasedSecretKey(tokenizer.getSecretKey());
        Map<String,Object> claims = tokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
        log.info(claims.toString());
        String email = claims.get("username").toString();
        String nickname = memberService.findMemberByEmail(email).getNickname();
        log.info(nickname);
        message.setSender(nickname);


        if (ChatMessage.MessageType.ENTER.equals(message.getType()))
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}

