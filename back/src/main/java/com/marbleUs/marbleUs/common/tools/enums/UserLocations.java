package com.marbleUs.marbleUs.common.tools.enums;

import lombok.Getter;
import lombok.Setter;

public enum UserLocations {

    BLOCK_0(0, "시작점"),
    BLOCK_A(1, ""),
    BLOCK_B(2, ""),
    BLOCK_C(3, ""),
    BLOCK_D(4, ""),
    BLOCK_E(5, ""),
    BLOCK_F(6, ""),
    BLOCK_G(7, ""),
    BLOCK_H(8, ""),
    BLOCK_I(9, ""),
    BLOCK_J(10, ""),
    BLOCK_K(11, ""),
    BLOCK_L(12, ""),
    BLOCK_M(13, ""),
    BLOCK_N(14, ""),
    BLOCK_O(15, ""),
    BLOCK_P(16, ""),
    BLOCK_Q(17, ""),
    BLOCK_R(18, ""),
    BLOCK_S(19, "");

    @Getter
    private final int num;

    @Getter
    @Setter
    private String cityName;

    UserLocations(int num, String cityName) {
        this.num = num;
        this.cityName = cityName;
    }
}
