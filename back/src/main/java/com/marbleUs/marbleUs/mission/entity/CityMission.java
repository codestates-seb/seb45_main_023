//package com.marbleUs.marbleUs.mission.entity;
//
//import com.marbleUs.marbleUs.city.entity.City;
//import com.marbleUs.marbleUs.common.tools.audit.Auditable;
//
//import javax.persistence.*;
//
//@Entity
//public class CityMission extends Auditable {
//
//    //미션과 다대일
//    @ManyToOne
//    @JoinColumn(name = "mission_id", nullable = false)
//    private Mission mission;
//
//    //도시와 다대일
//    @ManyToOne
//    @JoinColumn(name = "city_id", nullable = false)
//    private City city;
//
//    //미션의 레벨
//
//
//}
