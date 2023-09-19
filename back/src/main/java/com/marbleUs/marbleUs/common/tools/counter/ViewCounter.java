package com.marbleUs.marbleUs.common.tools.counter;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;


@RequiredArgsConstructor
@Component
@Slf4j
public class ViewCounter {
    private final RedisServiceUtil redisServiceUtil;
    private final ClientIpExtractor extractor;


    public void verifyIsViewed(HttpServletRequest request, Blog blog) {

        String ip = extractor.getClientIP(request);

        String viewCount = redisServiceUtil.getData(ip);
        if (viewCount == null) {
            //아예 새로 생성
            redisServiceUtil.setDateExpire(ip, blog.getId() + "_", expirationDate());
            increaseView(blog);
        } else {
            //저장된 맴버지만 방문하지 않은 블로그일 경우
            //key(맴버아이디)에 해당하는 밸류(블로그아이디)들을 이러레티터를 돌며 검사
            String[] strArray = viewCount.split("_");
            List<String> viewedBlogs = Arrays.asList(strArray);

            boolean isViewed = false;

            if (!viewedBlogs.isEmpty()) {
                for (String viewedBlog : viewedBlogs) {
                    //검사해서 방문기록이 있다면 break
                    if (String.valueOf(blog.getId()).equals(viewedBlog)) {
                        isViewed = true;
                        break;
                    }
                }
                if (!isViewed) {
                    //방문기록이 없다면
                    //블로그 아이디 추가
                    //래디스는 문자열 베이스기 때문에 문자열에 추가하고 split을 이용해 떼어내 검사한다.
                    viewCount += blog.getId() + "_";
                    //래디스에 같은 키값으로 업데이트
                    redisServiceUtil.setDateExpire(ip, viewCount, expirationDate());
                    //조회수 증가
                    increaseView(blog);
                }
            }
        }
    }

    private void increaseView(Blog blog) {
        blog.setViews(blog.getViews() + 1L);

    }

    private long expirationDate() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime midnight = now.truncatedTo(ChronoUnit.DAYS).plusDays(1);
        return ChronoUnit.SECONDS.between(now, midnight);
    }


}
