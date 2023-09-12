package com.marbleUs.marbleUs.city.mapper;

import com.marbleUs.marbleUs.city.dto.CityDto;
import com.marbleUs.marbleUs.city.entity.City;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {

    City postToCity(CityDto.Post post);
    City patchToCity(CityDto.Patch patch);
    CityDto.Response cityToResponse(City city);
    List<CityDto.Response> citiesToResponses(List<City> cities);

}
