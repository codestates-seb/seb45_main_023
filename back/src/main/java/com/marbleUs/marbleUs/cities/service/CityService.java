package com.marbleUs.marbleUs.cities.service;

import com.marbleUs.marbleUs.cities.entity.City;
import com.marbleUs.marbleUs.cities.repository.CityRepository;
import com.marbleUs.marbleUs.exception.BusinessLogicException;
import com.marbleUs.marbleUs.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepository repository;

    public City creeate(City city){

        verifyExistsCity(city.getName());

        return repository.save(city);
    }
    public City update(City city, Long cityId){

        City foundCity = findVerifiedCity(cityId);
        Optional.ofNullable(city.getDescription())
                .ifPresent(description -> foundCity.setDescription(description));
        Optional.ofNullable(city.getImg())
                .ifPresent(img -> foundCity.setDescription(img));


        return repository.save(foundCity);
    }

    @Transactional(readOnly = true)
    public City find(Long cityId){
        return findVerifiedCity(cityId);
    }

    @Transactional(readOnly = true)
    public Page<City> findCities(int page, int size){
        return repository.findAll(PageRequest.of(page-1,size, Sort.by("id").descending()));
    }

    public void deleteCity(Long cityId){

        City cityToDelete = findVerifiedCity(cityId);
        repository.delete(cityToDelete);
    }


    private void verifyExistsCity(String name) {

        Optional<City> city = repository.findByName(name);
        if (city.isPresent())
            throw new BusinessLogicException(ExceptionCode.CITY_EXISTS);

    }

    @Transactional(readOnly = true)
    public City findVerifiedCity(Long id) {
        Optional<City> optionalCity =
                repository.findById(id);
        City findCity =
                optionalCity.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findCity;
    }
}
