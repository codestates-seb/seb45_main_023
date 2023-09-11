package com.marbleUs.marbleUs.multiSearch.service;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.repository.BlogRepository;
import com.marbleUs.marbleUs.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SearchEngine {
    private final BlogRepository blogRepository;
    public Page<Blog> searh(String words, int page, int size) {

        List<Blog> results = new ArrayList<>();
        List<String> keywords = keywordsExtractor(words);

        for (String key: keywords) {
           List<Blog> blogs = blogRepository.findAllByKeywords(key);
           for (Blog blog: blogs) {
               results.add(blog);
           }
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("views").descending());
        return new PageImpl<>(results,pageRequest, results.size());
    }

    //for Korean
    private List<String> keywordsExtractor(String words) {
        //싱글 단어일 경우 그대로 리턴
        if(!words.contains(" ")){return Arrays.asList(words);}

        String[] keywords = words.split(" ");
        List<String> KeywordList = Arrays.asList(keywords);
        List<String> filteredKeywords1st = KeywordList.stream().filter(str -> str.endsWith("가") || str.endsWith("에") || str.endsWith("을") || str.endsWith("에서") || str.endsWith("하기")).collect(Collectors.toList());
        filteredKeywords1st.add(keywords[keywords.length-1]);
        List<String> filteredKeywordsFinal =filteredKeywords1st.stream().map(str->{
            if(str.endsWith("가")) return str.replaceAll("가","");
            if(str.endsWith("에")) return str.replaceAll("에","");
            if(str.endsWith("을")) return str.replaceAll("을","");
            if(str.endsWith("에서")) return str.replaceAll("에서","");
            if(str.endsWith("하기")) return str.replaceAll("하기","");
            return str;
        }).collect(Collectors.toList());

        return filteredKeywordsFinal;
    }
}
