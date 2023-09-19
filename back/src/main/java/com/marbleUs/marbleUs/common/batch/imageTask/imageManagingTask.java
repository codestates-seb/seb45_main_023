package com.marbleUs.marbleUs.common.batch.imageTask;

import com.marbleUs.marbleUs.common.s3.service.S3Service;
import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class imageManagingTask {
    private final ImageRepository imageRepository;
    private final S3Service s3Service;

    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Seoul")// Run every year
    private void deleteNotUsedImage(){
        List<Image> notUsedImages = imageRepository.findAllByIfBlogNull();

        for (Image image : notUsedImages){
            s3Service.delete(image.getName());
            imageRepository.delete(image);
        }

    }
}
