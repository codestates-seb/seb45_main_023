package com.marbleUs.marbleUs.image.service;

import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.image.entity.MemberImage;
import com.marbleUs.marbleUs.image.repository.ImageRepository;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import com.marbleUs.marbleUs.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final S3Service s3Service;
    private final ImageRepository imageRepository;
    private final MemberService memberService;

    public List<Image> submitFiles(List<MultipartFile> multipartFileList) throws IOException {

        List<Image> images = new ArrayList();

        for (MultipartFile multipartFile : multipartFileList) {
            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, fileName));
            images.add(image);
            // DB에는 전체 url말고 파일명으로 저장할 것임
            imageRepository.save(image);
        }


        return images;
    }

    public List<Image> uploadMemberImage(List<MultipartFile> multipartFileList, Long memberId)throws IOException{
        List<Image> images = new ArrayList();
        Member member = memberService.findVerifiedMember(memberId);

        for (MultipartFile multipartFile : multipartFileList) {
            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, fileName));
            images.add(image);
            MemberImage memberImage = new MemberImage();
            memberImage.setImage(image);
            memberImage.setMember(member);
            member.addProfilePic(memberImage);

            // DB에는 전체 url말고 파일명으로 저장할 것임
            imageRepository.save(image);

        }


        return images;
    }

    public void deleteMemberImage(Long memberImageId){
       Image imageToDelete = imageRepository.findById(memberImageId).get();
       imageRepository.delete(imageToDelete);
       s3Service.delete(imageToDelete.getName());
    }

    public List<Image> uploadBlogImage(List<MultipartFile> multipartFileList)throws IOException{
        List<Image> images = new ArrayList();


        for (MultipartFile multipartFile : multipartFileList) {
            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, fileName));
            images.add(image);

            // DB에는 전체 url말고 파일명으로 저장할 것임
            imageRepository.save(image);

        }


        return images;
    }

    public List<Image> updateBlogImage(List<MultipartFile> multipartFileList, List<String> names)throws IOException{
        List<Image> images = new ArrayList();

        for (String name:names){
            s3Service.delete(name);
            imageRepository.delete(imageRepository.findByName(name).get());
        }


        for (MultipartFile multipartFile : multipartFileList) {
            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, fileName));
            images.add(image);

            // DB에는 전체 url말고 파일명으로 저장할 것임
            imageRepository.save(image);

        }


        return images;
    }

    public void deleteBlogImage(String name){
//        for (String name:names){
            s3Service.delete(name);
            imageRepository.delete(imageRepository.findByName(name).get());
//        }
    }
}

