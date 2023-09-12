package com.marbleUs.marbleUs.common.tools.enums;


import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

public enum Stamps {

    STAMP_01_PIC_LV1(1, "경기","1"),
    STAMP_01_PIC_LV2(2, "경기","2"),
    STAMP_01_PIC_LV3(3, "경기","3"),
    STAMP_01_PIC_LV4(4, "경기","4"),
    STAMP_02_PIC_LV1(1, "전주","1"),
    STAMP_02_PIC_LV2(2, "전주","2"),
    STAMP_02_PIC_LV3(3, "전주","3"),
    STAMP_02_PIC_LV4(4, "전주","4"),
    STAMP_03_PIC_LV1(1, "전북","1"),
    STAMP_03_PIC_LV2(2, "전북","2"),
    STAMP_03_PIC_LV3(3, "전북","3"),
    STAMP_03_PIC_LV4(4, "전북","4"),
    STAMP_04_PIC_LV1(1, "경북","1"),
    STAMP_04_PIC_LV2(2, "경북","2"),
    STAMP_04_PIC_LV3(3, "경북","3"),
    STAMP_04_PIC_LV4(4, "경북","4"),
    STAMP_05_PIC_LV1(1, "충북","1"),
    STAMP_05_PIC_LV2(2, "충북","2"),
    STAMP_05_PIC_LV3(3, "충북","3"),
    STAMP_05_PIC_LV4(4, "충북","4"),
    STAMP_06_PIC_LV1(1, "전남","1"),
    STAMP_06_PIC_LV2(2, "전남","2"),
    STAMP_06_PIC_LV3(3, "전남","3"),
    STAMP_06_PIC_LV4(4, "전남","4"),
    STAMP_07_PIC_LV1(1, "경남","1"),
    STAMP_07_PIC_LV2(2, "경남","2"),
    STAMP_07_PIC_LV3(3, "경남","3"),
    STAMP_07_PIC_LV4(4, "경남","4"),
    STAMP_08_PIC_LV1(1, "충남","1"),
    STAMP_08_PIC_LV2(2, "충남","2"),
    STAMP_08_PIC_LV3(3, "충남","3"),
    STAMP_08_PIC_LV4(4, "충남","4"),
    STAMP_09_PIC_LV1(1, "독도","1"),
    STAMP_09_PIC_LV2(2, "독도","2"),
    STAMP_09_PIC_LV3(3, "독도","3"),
    STAMP_09_PIC_LV4(4, "독도","4"),
    STAMP_10_PIC_LV1(1, "세종","1"),
    STAMP_10_PIC_LV2(2, "세종","2"),
    STAMP_10_PIC_LV3(3, "세종","3"),
    STAMP_10_PIC_LV4(4, "세종","4"),
    STAMP_11_PIC_LV1(1, "울산","1"),
    STAMP_11_PIC_LV2(2, "울산","2"),
    STAMP_11_PIC_LV3(3, "울산","3"),
    STAMP_11_PIC_LV4(4, "울산","4"),
    STAMP_12_PIC_LV1(1, "광주","1"),
    STAMP_12_PIC_LV2(2, "광주","2"),
    STAMP_12_PIC_LV3(3, "광주","3"),
    STAMP_12_PIC_LV4(4, "광주","4"),
    STAMP_13_PIC_LV1(1, "대전","1"),
    STAMP_13_PIC_LV2(2, "대전","2"),
    STAMP_13_PIC_LV3(3, "대전","3"),
    STAMP_13_PIC_LV4(4, "대전","4"),
    STAMP_14_PIC_LV1(1, "제주","1"),
    STAMP_14_PIC_LV2(2, "제주","2"),
    STAMP_14_PIC_LV3(3, "제주","3"),
    STAMP_14_PIC_LV4(4, "제주","4"),
    STAMP_15_PIC_LV1(1, "대구","1"),
    STAMP_15_PIC_LV2(2, "대구","2"),
    STAMP_15_PIC_LV3(3, "대구","3"),
    STAMP_15_PIC_LV4(4, "대구","4"),
    STAMP_16_PIC_LV1(1, "인천","1"),
    STAMP_16_PIC_LV2(2, "인천","2"),
    STAMP_16_PIC_LV3(3, "인천","3"),
    STAMP_16_PIC_LV4(4, "인천","4"),
    STAMP_17_PIC_LV1(1,"부산","1"),
    STAMP_17_PIC_LV2(2,"부산","2"),
    STAMP_17_PIC_LV3(3,"부산","3"),
    STAMP_17_PIC_LV4(4,"부산","4"),
    STAMP_18_PIC_LV1(1, "서울","1"),
    STAMP_18_PIC_LV2(2, "서울","2"),
    STAMP_18_PIC_LV3(3, "서울","3"),
    STAMP_18_PIC_LV4(4, "서울","4");

    @Getter
    private final int level;

    @Getter
    private final String cityName;

    @Getter
    private final String imgPath;

    Stamps(int level, String cityName, String imgPath) {
        this.level = level;
        this.cityName = cityName;
        this.imgPath = imgPath;
    }
    public static Stamps find(String cityName, int level) {
        return Arrays.stream(values())
                .filter(stamps -> stamps.cityName.equals(cityName))
                .filter(stamps -> stamps.level == level)
                .findAny().orElse(null);
    }
}
