package at.htlleonding.voucher.boundary;

import at.htlleonding.voucher.control.VoucherRepository;
import at.htlleonding.voucher.entity.dto.VoucherDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import jakarta.ws.rs.Path;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ServerEndpoint("/websocket/qrcodes")
public class VoucherWebSocket {

    private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());

    VoucherRepository voucherRepository;

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket session opened: " + session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Received message from client " + session.getId() + ": " + message);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("WebSocket session closed: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println("WebSocket error occurred in session " + session.getId() + ": " + throwable.getMessage());
    }

    public static void pushData(Object data) {
        String jsonData = toJson(data);
        for (Session session : sessions) {
            try {
                session.getBasicRemote().sendText(jsonData);
            } catch (IOException e) {
                System.err.println("Error sending data to client " + session.getId() + ": " + e.getMessage());
            }
        }
    }

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public static String toJson(Object data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            // Handle the exception more gracefully
            throw new RuntimeException("Error converting object to JSON: " + e.getMessage(), e);
        }
    }
}
