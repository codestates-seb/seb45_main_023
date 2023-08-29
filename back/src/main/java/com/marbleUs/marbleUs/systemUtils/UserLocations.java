package com.marbleUs.marbleUs.systemUtils;

import lombok.Getter;

public enum UserLocations {

    BLOCK_0(0, "시작점"),
    BLOCK_A(1, "경기"),
    BLOCK_B(2, "전주"),
    BLOCK_C(3, "전북"),
    BLOCK_D(4, "경북"),
    BLOCK_E(5, "울릉도,독도"),
    BLOCK_F(6, "충북"),
    BLOCK_G(7, "전남"),
    BLOCK_H(8, "경남"),
    BLOCK_I(9, "충남"),
    BLOCK_J(10, "자유여행"),
    BLOCK_K(11, "세종"),
    BLOCK_L(12, "울산"),
    BLOCK_M(13, "광주"),
    BLOCK_N(14, "대전"),
    BLOCK_O(15, "제주"),
    BLOCK_P(16, "대구"),
    BLOCK_Q(17, "인천"),
    BLOCK_R(18, "부산"),
    BLOCK_S(19, "서울");

    @Getter
    private int num;

    @Getter
    private String cityName;

    UserLocations(int num, String cityName) {
        this.num = num;
        this.cityName = cityName;
    }
}
