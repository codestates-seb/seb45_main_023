package com.marbleUs.marbleUs.image.service;

import com.marbleUs.marbleUs.blog.repository.BlogRepository;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.image.repository.ImageRepository;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import com.marbleUs.marbleUs.common.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
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

    @Transactional
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

    @Transactional
    public List<Image> uploadMemberImage(List<MultipartFile> multipartFileList, Long memberId)throws IOException{
        List<Image> images = new ArrayList();
        Member member = memberService.findVerifiedMember(memberId);

        for (MultipartFile multipartFile : multipartFileList) {
            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, "images/member-images/"+fileName));
            images.add(image);

            member.addProfilePic(image);

            // DB에는 전체 url말고 파일명으로 저장할 것임
            imageRepository.save(image);

        }


        return images;
    }

    @Transactional
    public void deleteMemberImage(List<String> names){
        for(String name:names) {
            Image imageToDelete = imageRepository.findByName(name).get();
            imageRepository.delete(imageToDelete);
            s3Service.delete("images/member-images/"+ imageToDelete.getName());
        }

    }

    @Transactional
    public Image uploadBlogImage(MultipartFile multipartFile)throws IOException{

            // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
            String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

            Image image = new Image();
            image.setName(fileName);
            // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
            image.setPath(s3Service.upload(multipartFile, "images/blog-images/"+fileName));

//            Blog blog = blogRepository.findById(blogId).get();
//            blog.addBlogImage(image);

            imageRepository.save(image);


        return image;
    }
    //로직 최적화 요망

//    @Transactional
//    public List<Image> updateBlogImage(List<MultipartFile> multipartFileList, List<String> namesToChange)throws IOException{
//        List<Image> images = new ArrayList();
//
//            for (MultipartFile multipartFile : multipartFileList) {
//                // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
//                String fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();
//                Image image = new Image();
//                image.setName(fileName);
//                image.setPath(s3Service.upload(multipartFile, "images/blog-images/"+fileName));
//                // 파일데이터와 파일명 넘겨서 S3에 저장 / 이미지 테이블에 path저장
//                images.add(image);
//
//                // DB에는 전체 url말고 파일명으로 저장할 것임
//                imageRepository.save(image);
//
//            }
//
//
//
//        return images;
//    }

    //Transaction 관리에 대해 연구 요망

    @Transactional
    public void deleteBlogImage(List<String> names){
        for (String name:names){
            imageRepository.delete(imageRepository.findByName(name).get());
            s3Service.delete("images/blog-images/"+name);
        }
    }
    @Transactional
    public List<Image> findMemberImages(Long memberId) {
        Member findMember = memberService.findVerifiedMember(memberId);
        List<Image> profilePics = findMember.getProfilePics();
        return profilePics;
    }

    @Transactional
    public Image findBlogImage(String name){

        Image image = imageRepository.findByName(name).orElseThrow(()->new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));

        return image;

    }
}

