package com.marbleUs.marbleUs.cities.mapper;

import com.marbleUs.marbleUs.cities.dto.CityDto;
import com.marbleUs.marbleUs.cities.entity.City;
import com.marbleUs.marbleUs.cities.entity.CityEntity;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {

    City postToCity(CityDto.Post post);
    City patchToCity(CityDto.Patch patch);
    CityDto.Response cityToResponse(City city);
    List<CityDto.Response> citiesToResponses(List<City> cities);

}
