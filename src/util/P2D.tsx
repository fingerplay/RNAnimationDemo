'use strict';

import {Dimensions} from 'react-native';

//设备的宽度，单位:pd
export const deviceWidthDp = Dimensions.get('screen').width;
export const deviceHeightDp = Dimensions.get('screen').height;

//设计稿宽度,单位：px
const uiWidthPx = 375;
const dp_px_ratio = deviceWidthDp / uiWidthPx;

/**
 * 将px转换到pd
 * @param uiElementPx 设计稿的尺寸
 * @returns {number} 实际屏幕的尺寸
 */
export function scale(uiElementPx: number) {
  return p2d(uiElementPx);
}

/**
 * 将px转换到pd
 * @param uiElementPx 设计稿的尺寸
 * @returns {number} 实际屏幕的尺寸
 */
export default function p2d(uiElementPx: number, params?: any) {
  if (params) {
    const {maxLock, minLock} = params;

    //限制最大值为 uiElementPx
    if (maxLock) {
      if (uiElementPx * dp_px_ratio > uiElementPx) {
        return uiElementPx;
      }
    }
    //限制最小值为 uiElementPx
    else if (minLock) {
      if (uiElementPx * dp_px_ratio < uiElementPx) {
        return uiElementPx;
      }
    }
    return uiElementPx * dp_px_ratio;
  } else {
    return uiElementPx * dp_px_ratio;
  }
}
