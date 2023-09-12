package com.marbleUs.marbleUs.common.websocket.chat.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

@Component
public class StompExceptionHandler extends StompSubProtocolErrorHandler {
}
