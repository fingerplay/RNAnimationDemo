import React, {Component} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
// import Swiper from './Swiper';
import Swiper from 'react-native-swiper';
import {deviceWidthDp} from '../util/P2D';
import SingleFoodComponent, {
  AnimationState,
  FoodType,
} from './SingleFoodComponent';

type SwiperProps = {
  onScroll: (ratio: number, currentPage: number, targetPage: number) => void;
  onIndexChanged?: (index: number) => void;
  onAddBtnPress: (amount: number) => void;
  allFoods: Array<FoodType>;
};

export class SwiperWrapper extends Component<SwiperProps> {
  scrollBeginContentOffsetX = undefined;
  scrollEndContentOffsetX = undefined;

  currentPage = 0;
  isScrolling = false;

  componentRefs: Array<SingleFoodComponent> = [];

  constructor(props: SwiperProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<SwiperProps>): boolean {
    // console.log('isScrolling', this.isScrolling );
    return false;
    // if (this.isScrolling) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  render() {
    console.log('render swiper');
    return (
      <Swiper
        horizontal={true}
        pagingEnabled={true}
        showsPagination={false}
        loop={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.foodScrollView}
        onScroll={this.onScroll}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        onMomentumScrollEnd={this.onScrollEnd}
        onIndexChanged={(index: number) => {
          this.currentPage = index;
          console.log('currentPage=' + index);
          this.props.onIndexChanged && this.props.onIndexChanged(index);
        }}>
        {this.props.allFoods.map((index: FoodType) => {
          return (
            <SingleFoodComponent
              key={`Food-${index}`}
              type={index}
              onAddBtnPress={this.props.onAddBtnPress}
              ref={(ref: SingleFoodComponent) => {
                // this.componentRefs[index] = ref;
                this.componentRefs.push(ref);
              }}
            />
          );
        })}
      </Swiper>
    );
  }

  onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollBeginContentOffsetX = e.nativeEvent.contentOffset.x;
    this.isScrolling = true;
    console.log('scrollBeginContentOffsetX=' + this.scrollBeginContentOffsetX);
  };

  onScrollEnd = () => {
    this.isScrolling = false;
    this.componentRefs.forEach((ref: SingleFoodComponent) => {
      ref.setAnimationState(AnimationState.None, 0);
    });
    // console.log('scroll End');
  };

  onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollEndContentOffsetX = e.nativeEvent.contentOffset.x;
  };

  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    //e.nativeEvent.contentOffset.x是内容偏移量，要减去一个屏幕的宽度才是滑动的偏移量，我们需要通过滑动偏移量来计算比例
    // const offsetX = e.nativeEvent.contentOffset.x - deviceWidthDp;
    var offsetX = e.nativeEvent.contentOffset.x;
    
    console.log('contentOffsetX', offsetX);
    if (
      this.scrollBeginContentOffsetX === undefined ||
      offsetX === this.scrollBeginContentOffsetX
    ) {
      return;
    }

    if (offsetX < this.scrollBeginContentOffsetX - deviceWidthDp) {
      offsetX = offsetX + deviceWidthDp * 3;
    } else if (offsetX > this.scrollBeginContentOffsetX + deviceWidthDp) {
      offsetX = offsetX - deviceWidthDp * 3;
    }

    var towardRight =
      (this.scrollEndContentOffsetX &&
        this.scrollBeginContentOffsetX &&
        this.scrollEndContentOffsetX > this.scrollBeginContentOffsetX) ||
      offsetX > this.scrollBeginContentOffsetX;

      console.log('adjusted contentOffsetX', offsetX);
    //特殊情况处理，当从第0页往前滑时，contentOffSet会变为最后一页的偏移量
    // if (offsetX === 0 && (offsetX < 0 || offsetX > deviceWidthDp * 4)) {
    //   towardRight = false;
    // }
    const currentPageExtend = this.scrollBeginContentOffsetX / deviceWidthDp;
    var targetPageExtend = towardRight
      ? currentPageExtend + 1
      : currentPageExtend - 1;

    const targetPage = targetPageExtend - 1;
    var adjustedTargetPage = targetPage;
    if (targetPage >= 3) {
      adjustedTargetPage = targetPage - 3;
    } else if (targetPage < 0) {
      adjustedTargetPage = targetPage + 3;
    }
    // console.log('targetPage', targetPage);
    console.log('adjustedTargetPage', adjustedTargetPage);
    // console.log('currentPageExtend', currentPageExtend);
    console.log('targetPageExtend', targetPageExtend);

    const targetOffsetX = targetPageExtend * deviceWidthDp;
    const ratio = 1 - Math.abs(offsetX - targetOffsetX) / deviceWidthDp;
    console.log('ratio', ratio);
    this.props.onScroll(ratio, this.currentPage, adjustedTargetPage);

    for (var i = 0; i < this.componentRefs.length; i++) {
      let componentRef = this.componentRefs[i];
      if (targetPageExtend === i && this.isScrolling) {
        componentRef.setAnimationState(AnimationState.FadeIn, ratio);
      } else if (currentPageExtend === i && this.isScrolling) {
        componentRef.setAnimationState(AnimationState.FadeOut, ratio);
      } else {
        // componentRef.setAnimationState(AnimationState.None, animateRate);
      }
    }
  };
}

const styles = StyleSheet.create({
  foodScrollView: {
    // width: deviceWidthDp * 3,
    height: 360,
  },
});
