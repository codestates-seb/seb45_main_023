package com.marbleUs.marbleUs.systemUtils;

import lombok.Getter;

public enum Stamps {

    STMAP_01(1, "경기",""),
    STMAP_02(2, "전주",""),
    STMAP_03(3, "전북",""),
    STMAP_04(4, "경북",""),
    STMAP_05(5, "울릉도",""),
    STMAP_06(6, "충북",""),
    STMAP_07(7, "전남",""),
    STMAP_08(8, "경남",""),
    STMAP_09(9, "충남",""),
    STMAP_10(10, "독도",""),
    STMAP_11(11, "세종",""),
    STMAP_12(12, "울산",""),
    STMAP_13(13, "광주",""),
    STMAP_14(14, "대전",""),
    STMAP_15(15, "제주",""),
    STMAP_16(16, "대구",""),
    STMAP_17(17, "인천",""),
    STMAP_18(18,"부산",""),
    STMAP_19(19, "서울","");

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
