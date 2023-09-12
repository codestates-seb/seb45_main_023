package com.marbleUs.marbleUs.image.mapper;

import com.marbleUs.marbleUs.image.dto.ImageResponseDto;
import com.marbleUs.marbleUs.image.entity.Image;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageResponseDto imageToResponse(Image image);
    List<ImageResponseDto> imagesToResponses(List<Image> images);

}
