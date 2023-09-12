package com.marbleUs.marbleUs.common.websocket.chat.dto;

//import com.marbleUs.marbleUs.common.websocket.chat.service.ChatRoomService;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDto {
    private String roomId;
    private String name;

    /*
    * Stomp를 이용해 간소화
    *
    * */
//    private Set<WebSocketSession> sessions = new HashSet<>();
//
//    @Builder
//    public ChatRoom(String roomId, String name) {
//        this.roomId = roomId;
//        this.name = name;
//    }
//
//    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatRoomService chatService) {
//        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
//            sessions.add(session);
//            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
//        }
//        sendMessage(chatMessage, chatService);
//    }
//
//    public <T> void sendMessage(T message, ChatRoomService chatService) {
//        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
//    }
}
