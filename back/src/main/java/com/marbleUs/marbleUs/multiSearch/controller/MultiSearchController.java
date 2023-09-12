package com.marbleUs.marbleUs.multiSearch.controller;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.mapper.BlogMapper;
import com.marbleUs.marbleUs.multiSearch.service.SearchEngine;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class MultiSearchController {

    private final SearchEngine searchEngine;
    private final BlogMapper blogMapper;
    @GetMapping
    public ResponseEntity multiSearch(@RequestParam String words,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size){

        Page<Blog> searchResults = searchEngine.searh(words, page, size);
     return new ResponseEntity<>(blogMapper.toBlogResponseDtos(searchResults.getContent()),HttpStatus.OK);
    }
}
