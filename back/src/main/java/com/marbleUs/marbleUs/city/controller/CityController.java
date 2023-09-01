package com.marbleUs.marbleUs.city.controller;

import com.marbleUs.marbleUs.city.dto.CityDto;
import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.mapper.CityMapper;
import com.marbleUs.marbleUs.city.service.CityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController {

    private final CityMapper mapper;
    private final CityService service;


    //관리자페이지용
    @PostMapping
    public ResponseEntity postCity(@RequestBody CityDto.Post post){
        City city = service.creeate(mapper.postToCity(post));

        return new ResponseEntity<>("A city is created!",HttpStatus.CREATED);
    }
    @PatchMapping("/{city-id}")
    public ResponseEntity patchCity(@RequestBody CityDto.Patch patch,
                                   @Positive @PathVariable("city-id") Long cityId){

        City city = service.update(mapper.patchToCity(patch),cityId);

        return new ResponseEntity<>("The city is updated!",HttpStatus.OK);
    }
    @GetMapping("/{city-id}")
    public ResponseEntity getCity(@PathVariable("city-id") Long cityId){
        City city = service.find(cityId);

        return new ResponseEntity<>(mapper.cityToResponse(city),HttpStatus.OK);
    }

    //관리자페이지용
    @GetMapping
    public ResponseEntity getCities(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size){
        Page<City> cityPage = service.findCities(page,size);
        List<CityDto.Response> responses = mapper.citiesToResponses(cityPage.getContent());

        return new ResponseEntity<>(responses,HttpStatus.OK);
    }
    @DeleteMapping("/{city-id}")
    public ResponseEntity deleteCity(@PathVariable("city-id") Long cityId){

        service.deleteCity(cityId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
