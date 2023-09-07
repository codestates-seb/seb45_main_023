package com.marbleUs.marbleUs.common.tools.enums;

import lombok.Getter;

public enum Stamps {

    STMAP_01(1, "경기",""),
    STMAP_02(2, "전주",""),
    STMAP_03(3, "전북",""),
    STMAP_04(4, "경북",""),
    STMAP_05(6, "충북",""),
    STMAP_06(7, "전남",""),
    STMAP_07(8, "경남",""),
    STMAP_08(9, "충남",""),
    STMAP_9(10, "독도",""),
    STMAP_10(11, "세종",""),
    STMAP_11(12, "울산",""),
    STMAP_12(13, "광주",""),
    STMAP_13(14, "대전",""),
    STMAP_14(15, "제주",""),
    STMAP_15(16, "대구",""),
    STMAP_16(17, "인천",""),
    STMAP_17(18,"부산",""),
    STMAP_18(19, "서울","");

    @Getter
    int stampCode;

    @Getter
    String cityName;

    @Getter
    String imgPath;

    Stamps(int stampCode, String cityName, String imgPath) {
        this.stampCode = stampCode;
        this.cityName = cityName;
        this.imgPath = imgPath;
    }
}
