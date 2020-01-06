package com.goaleaf.services;

import com.goaleaf.entities.DTO.NotificationDTO;
import com.goaleaf.entities.DTO.NotificationPageDTO;
import com.goaleaf.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface NotificationService {

    Iterable<NotificationDTO> getAllByUserID(Integer userID);

    NotificationDTO saveNotification(Notification notification);

    Iterable<NotificationDTO> getAll();

    void removeFromDatabaseByID(Integer ntfID);

    NotificationDTO findSpecifiedNtf(Integer userID, String url);

    NotificationDTO findByDescription(String description);

    Iterable<NotificationDTO> clearNtf(Integer userID);

    NotificationPageDTO getUserNtfPaging(Integer pageNr, Integer objectsNr, String token);

}
