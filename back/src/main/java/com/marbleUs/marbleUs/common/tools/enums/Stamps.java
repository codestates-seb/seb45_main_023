package com.marbleUs.marbleUs.common.tools.enums;


import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

public enum Stamps {

    STAMP_19_PIC_LV1(1, "경기도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_19_PIC_LV2(2, "경기도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_19_PIC_LV3(3, "경기도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_19_PIC_LV4(4, "경기도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_18_PIC_LV1(1, "강원특별자치도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_18_PIC_LV2(2, "강원특별자치도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_18_PIC_LV3(3, "강원특별자치도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_18_PIC_LV4(4, "강원특별자치도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_17_PIC_LV1(1, "전라북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_17_PIC_LV2(2, "전라북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_17_PIC_LV3(3, "전라북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_17_PIC_LV4(4, "전라북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_16_PIC_LV1(1, "경상북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_16_PIC_LV2(2, "경상북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_16_PIC_LV3(3, "경상북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_16_PIC_LV4(4, "경상북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_15_PIC_LV1(1, "울릉도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B3%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_15_PIC_LV2(2, "울릉도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B3%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_15_PIC_LV3(3, "울릉도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B3%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_15_PIC_LV4(4, "울릉도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B3%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_14_PIC_LV1(1, "충청북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_14_PIC_LV2(2, "충청북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_14_PIC_LV3(3, "충청북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_14_PIC_LV4(4, "충청북도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_13_PIC_LV1(1, "전라남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_13_PIC_LV2(2, "전라남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_13_PIC_LV3(3, "전라남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_13_PIC_LV4(4, "전라남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_12_PIC_LV1(1, "경상남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_12_PIC_LV2(2, "경상남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_12_PIC_LV3(3, "경상남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_12_PIC_LV4(4, "경상남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_11_PIC_LV1(1, "충청남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_11_PIC_LV2(2, "충청남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_11_PIC_LV3(3, "충청남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_11_PIC_LV4(4, "충청남도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_10_PIC_LV1(1, "자유여행","1"),
    STAMP_10_PIC_LV2(2, "자유여행","2"),
    STAMP_10_PIC_LV3(3, "자유여행","3"),
    STAMP_10_PIC_LV4(4, "자유여행","4"),

    STAMP_09_PIC_LV1(1, "세종특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_09_PIC_LV2(2, "세종특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_09_PIC_LV3(3, "세종특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_09_PIC_LV4(4, "세종특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_08_PIC_LV1(1, "울산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_08_PIC_LV2(2, "울산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_08_PIC_LV3(3, "울산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_08_PIC_LV4(4, "울산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_07_PIC_LV1(1, "광주광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%80%E1%85%AA%E1%86%BC%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_07_PIC_LV2(2, "광주광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%80%E1%85%AA%E1%86%BC%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_07_PIC_LV3(3, "광주광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%80%E1%85%AA%E1%86%BC%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_07_PIC_LV4(4, "광주광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%80%E1%85%AA%E1%86%BC%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_06_PIC_LV1(1, "대전광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_06_PIC_LV2(2, "대전광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_06_PIC_LV3(3, "대전광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_06_PIC_LV4(4, "대전광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_05_PIC_LV1(1, "제주도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_05_PIC_LV2(2, "제주도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_05_PIC_LV3(3, "제주도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_05_PIC_LV4(4, "제주도","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_04_PIC_LV1(1, "대구광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%83%E1%85%A2%E1%84%80%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_04_PIC_LV2(2, "대구광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%83%E1%85%A2%E1%84%80%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_04_PIC_LV3(3, "대구광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%83%E1%85%A2%E1%84%80%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_04_PIC_LV4(4, "대구광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%83%E1%85%A2%E1%84%80%E1%85%AE+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_03_PIC_LV1(1, "인천광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_03_PIC_LV2(2, "인천광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_03_PIC_LV3(3, "인천광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_03_PIC_LV4(4, "인천광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_02_PIC_LV1(1,"부산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_02_PIC_LV2(2,"부산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_02_PIC_LV3(3,"부산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_02_PIC_LV4(4,"부산광역시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),

    STAMP_01_PIC_LV1(1, "서울특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level1/%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+1.png"),
    STAMP_01_PIC_LV2(2, "서울특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level2/%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+2.png"),
    STAMP_01_PIC_LV3(3, "서울특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level3/%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+3.png"),
    STAMP_01_PIC_LV4(4, "서울특별시","https://marbleus-s3.s3.ap-northeast-2.amazonaws.com/images/stamps/level4/%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF+%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF+4.png"),
    STAMP_00_EMPTY(0, "","");


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
