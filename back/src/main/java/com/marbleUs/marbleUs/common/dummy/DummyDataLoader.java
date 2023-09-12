//package com.marbleUs.marbleUs.common.dummy;
//
//
//import com.marbleUs.marbleUs.comment.entity.Comment;
//import com.marbleUs.marbleUs.comment.repository.CommentRepository;
//import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
//import com.marbleUs.marbleUs.blog.entity.Blog;
//import com.marbleUs.marbleUs.blog.repository.BlogRepository;
//import com.marbleUs.marbleUs.city.entity.City;
//import com.marbleUs.marbleUs.city.repository.CityRepository;
//import com.marbleUs.marbleUs.member.entity.Member;
//import com.marbleUs.marbleUs.member.repository.MemberRepository;
//import com.marbleUs.marbleUs.common.tools.generator.MemberNickNameGenerator;
//import com.marbleUs.marbleUs.common.tools.generator.NickNameGenerator;
//import com.marbleUs.marbleUs.mission.entity.Mission;
//import com.marbleUs.marbleUs.mission.repository.MissionRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.List;
//
////import lombok.AllArgsConstructor;
////import org.springframework.boot.CommandLineRunner;
////import org.springframework.stereotype.Component;
////
////더미생성용 클래스 입니다, 사용시 퀘스쳔 생성자를 주석해제해야 합니다
//@Component
//@AllArgsConstructor
//public class DummyDataLoader implements CommandLineRunner {
//
//
//  private final MemberRepository memberRepository;
//  private final PasswordEncoder passwordEncoder;
//  private final CustomAuthorityUtils authorityUtils;
//  private final MemberNickNameGenerator nickNameGenerator;
//  private final CityRepository cityRepository;
//  private final BlogRepository blogRepository;
//  private final CommentRepository commentRepository;
//  private final MissionRepository missionRepository;
//
//
//
//  @Override
//  public void run(String... args) throws Exception {
//
//
//      List<String> roles = authorityUtils.createRoles("test@gmail.com");
//
//      String encryptedPassword = passwordEncoder.encode("testPassword123");
//
//      String nickName = nickNameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.animals);
//
//
//      LocalDate birthDate =  LocalDate.now();
//      Member member1 = new Member();
//      member1.setEmail("test@gmail.com");
//      member1.setPassword(encryptedPassword);
//      member1.setRoles(roles);
//      member1.setNickname(nickName);
//      member1.setNationality("대한민국");
//      member1.setBirth(birthDate);
//
//
//
//      String nickName2 = nickNameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.animals);
//      LocalDate birthDate2 =  LocalDate.now();
//      Member member2 = new Member();
//      member2.setEmail("asdf@gmail.com");
//      member2.setPassword(encryptedPassword);
//      member2.setRoles(roles);
//      member2.setNickname(nickName2);
//      member2.setNationality("대한민국");
//      member2.setBirth(birthDate2);
//
//      memberRepository.save(member1);
//      memberRepository.save(member2);
//
//
//      City city = new City();
//      city.setName("서울");
//      city.setEngName("Seoul");
//      city.setDescription("과거와 현재가 공존하며 하루가 다르게 변하는 서울을 여행하는 일은 매일이 새롭다. 도시 한복판에서 600년의 역사를 그대로 안고 있는 아름다운 고궁들과 더불어 대한민국의 트렌드를 이끌어나가는 예술과 문화의 크고 작은 동네들을 둘러볼 수 있는 서울은 도시 여행에 최적화된 장소다.");
//      city.setNx("60");
//      city.setNy("127");
//
//      City city2 = new City();
//      city2.setName("경기");
//      city2.setEngName("Gyeonggi");
//      city2.setDescription("여기는 경기도 입니다.");
//      city2.setNx("69");
//      city2.setNy("125");
//
//      City city3 = new City();
//      city3.setName("서울2");
//      city3.setEngName("Seoul");
//      city3.setDescription("과거와 현재가 공존하며 하루가 다르게 변하는 서울을 여행하는 일은 매일이 새롭다. 도시 한복판에서 600년의 역사를 그대로 안고 있는 아름다운 고궁들과 더불어 대한민국의 트렌드를 이끌어나가는 예술과 문화의 크고 작은 동네들을 둘러볼 수 있는 서울은 도시 여행에 최적화된 장소다.");
//      city3.setNx("60");
//      city3.setNy("127");
//
//      City city4 = new City();
//      city4.setName("경기2");
//      city4.setEngName("Gyeonggi");
//      city4.setDescription("여기는 경기도 입니다.");
//      city4.setNx("69");
//      city4.setNy("125");
//
//      City city5 = new City();
//      city5.setName("서울3");
//      city5.setEngName("Seoul");
//      city5.setDescription("과거와 현재가 공존하며 하루가 다르게 변하는 서울을 여행하는 일은 매일이 새롭다. 도시 한복판에서 600년의 역사를 그대로 안고 있는 아름다운 고궁들과 더불어 대한민국의 트렌드를 이끌어나가는 예술과 문화의 크고 작은 동네들을 둘러볼 수 있는 서울은 도시 여행에 최적화된 장소다.");
//      city5.setNx("60");
//      city5.setNy("127");
//
//      City city6 = new City();
//      city6.setName("경기3");
//      city6.setEngName("Gyeonggi");
//      city6.setDescription("여기는 경기도 입니다.");
//      city6.setNx("69");
//      city6.setNy("125");
//
//      City city7 = new City();
//      city7.setName("서울4");
//      city7.setEngName("Seoul");
//      city7.setDescription("과거와 현재가 공존하며 하루가 다르게 변하는 서울을 여행하는 일은 매일이 새롭다. 도시 한복판에서 600년의 역사를 그대로 안고 있는 아름다운 고궁들과 더불어 대한민국의 트렌드를 이끌어나가는 예술과 문화의 크고 작은 동네들을 둘러볼 수 있는 서울은 도시 여행에 최적화된 장소다.");
//      city7.setNx("60");
//      city7.setNy("127");
//
//      City city8 = new City();
//      city8.setName("경기4");
//      city8.setEngName("Gyeonggi");
//      city8.setDescription("여기는 경기도 입니다.");
//      city8.setNx("69");
//      city8.setNy("125");
//
//      cityRepository.save(city);
//      cityRepository.save(city2);
//      cityRepository.save(city3);
//      cityRepository.save(city4);
//      cityRepository.save(city5);
//      cityRepository.save(city6);
//      cityRepository.save(city7);
//      cityRepository.save(city8);
//
//
//      Blog blog = new Blog();
//      blog.setTitle("서울 여행을 다녀왔어요.");
//      List<String> tags = Arrays.asList("맛집","놀거리","숙소");
//      blog.setBody("서울 여행을 다녀왔어요. 왼전 재밌었어요. 또가고싶습니다.");
//      blog.setTags(tags);
//      blog.setMember(member1);
//      blog.setCity(city);
//      blog.setCity(blog.getCity());
//
//
//      Blog blog2 = new Blog();
//      blog2.setTitle("수원 여행을 다녀왔어요.");
//      List<String> tags2 = Arrays.asList("맛집","놀거리","숙소");
//      blog2.setBody("수원 여행을 다녀왔어요. 왼전 재밌었어요. 또가고싶습니다.");
//      blog2.setTags(tags2);
//      blog2.setMember(member2);
//      blog2.setCity(city2);
//      blog2.setCity(blog2.getCity());
//
//
//      blogRepository.save(blog);
//      blogRepository.save(blog2);
//
//
//      Comment comment1 = new Comment();
//      comment1.setBlog(blog);
//      comment1.setMember(member2);
//      comment1.setBody("우왕 너무 재밌었겠다. 저도 서울 꼭 가봐야 겠어요");
//      blog.addComment(comment1);
//      member2.addMyComment(comment1);
//
//
//      Comment comment2 = new Comment();
//      comment2.setBlog(blog2);
//      comment2.setMember(member1);
//      comment2.setBody("우왕 너무 재밌었겠다. 저도 수원 꼭 가봐야 겠어요");
//
//      blog2.addComment(comment2);
//      member1.addMyComment(comment2);
//
//      commentRepository.save(comment1);
//      commentRepository.save(comment2);
//
//
//      member1.addMyComment(comment1);
//      member2.addMyComment(comment2);
//
//      member1.addBookMarks(blog2);
//      member2.addBookMarks(blog);
//
//      memberRepository.save(member1);
//      memberRepository.save(member2);
//
//      Mission mission1 = new Mission();
//      mission1.setLevel(1);
//      mission1.setMissionType(Mission.MissionType.COMMON);
//      mission1.setContent("자전거 여행 하기");
//
//      Mission mission2 = new Mission();
//      mission2.setLevel(1);
//      mission2.setMissionType(Mission.MissionType.COMMON);
//      mission2.setContent("기차 여행 하기");
//
//      Mission mission3 = new Mission();
//      mission3.setLevel(1);
//      mission3.setMissionType(Mission.MissionType.COMMON);
//      mission3.setContent("도보 여행 하기");
//
//      Mission mission4 = new Mission();
//      mission4.setLevel(3);
//      mission4.setMissionType(Mission.MissionType.COMMON);
//      mission4.setContent("캠핑 하기");
//
//      Mission mission5 = new Mission();
//      mission5.setLevel(3);
//      mission5.setMissionType(Mission.MissionType.COMMON);
//      mission5.setContent("노숙 하기");
//
//      Mission mission6 = new Mission();
//      mission6.setLevel(3);
//      mission6.setMissionType(Mission.MissionType.COMMON);
//      mission6.setContent("맛집 탐방 하기");
//
//
//      Mission mission7 = new Mission();
//      mission7.setLevel(2);
//      mission7.setMissionType(Mission.MissionType.SPECIAL);
//      mission7.setCityName("서울");
//      mission7.setContent("경복궁 여행 하기");
//
//      Mission mission8 = new Mission();
//      mission8.setLevel(2);
//      mission8.setCityName("서울");
//      mission8.setMissionType(Mission.MissionType.SPECIAL);
//      mission8.setContent("종로 여행 하기");
//
//      Mission mission9 = new Mission();
//      mission9.setLevel(2);
//      mission9.setMissionType(Mission.MissionType.SPECIAL);
//      mission9.setCityName("서울");
//      mission9.setContent("광화문 여행 하기");
//
//      Mission mission10 = new Mission();
//      mission10.setLevel(4);
//      mission10.setCityName("서울");
//      mission10.setMissionType(Mission.MissionType.SPECIAL);
//      mission10.setContent("한강에서 캠핑 하기");
//
//      Mission mission11 = new Mission();
//      mission11.setLevel(4);
//      mission11.setCityName("서울");
//      mission11.setMissionType(Mission.MissionType.SPECIAL);
//      mission11.setContent("북촌한옥마을 한복투어 하기");
//
//      Mission mission12 = new Mission();
//      mission12.setLevel(4);
//      mission12.setCityName("서을");
//      mission12.setMissionType(Mission.MissionType.SPECIAL);
//      mission12.setContent("서울 도보 탐방 하기");
//
//      missionRepository.save(mission1);
//      missionRepository.save(mission2);
//      missionRepository.save(mission3);
//      missionRepository.save(mission4);
//      missionRepository.save(mission5);
//      missionRepository.save(mission6);
//      missionRepository.save(mission7);
//      missionRepository.save(mission8);
//      missionRepository.save(mission9);
//      missionRepository.save(mission10);
//      missionRepository.save(mission11);
//      missionRepository.save(mission12);
//
//
//
//
//
//
//
//
//      // 더미 데이터 저장
//
//
//
//
//
//
//
//  }
//}
