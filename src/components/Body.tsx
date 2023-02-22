import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {deviceWidthDp, scale} from '../util/P2D';
import SingleFoodComponent, {FoodType} from './SingleFoodComponent';

type Props = {
  onAddFood: (amount: number) => void;
};
type State = {
  // selectedFood: [FoodType];
  selectHamberger: boolean;
  selectCoffee: boolean;
  selectPatato: boolean;
  // currentPage: number;
  star1Left: number;
  star1Top: number;
  star2Left: number;
  star2Top: number;
  star3Left: number;
  star3Top: number;
};

type SwiperProps = {
  onScroll: (ratio: number, currentPage: number, targetPage: number) => void;
  onIndexChanged?: (index: number) => void;
  onAddBtnPress: (amount: number) => void;
  allFoods: Array<FoodType>;
};
class SwiperWrapper extends Component<SwiperProps> {
  scrollBeginContentOffsetX = 0;
  currentPage = 0;
  shouldComponentUpdate(nextProps: Readonly<SwiperProps>): boolean {
    if (this.props.allFoods.length === nextProps.allFoods.length) {
      for (var i = 0; i < this.props.allFoods.length; i++) {
        if (this.props.allFoods[i] !== nextProps.allFoods[i]) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
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
            />
          );
        })}
      </Swiper>
    );
  }

  onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    //e.nativeEvent.contentOffset.x是内容偏移量，要减去一个屏幕的宽度才是滑动的偏移量
    this.scrollBeginContentOffsetX =
      e.nativeEvent.contentOffset.x - deviceWidthDp;
    console.log('scrollBeginContentOffsetX=' + this.scrollBeginContentOffsetX);
  };

  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    //e.nativeEvent.contentOffset.x是内容偏移量，要减去一个屏幕的宽度才是滑动的偏移量，我们需要通过滑动偏移量来计算比例
    const offsetX = e.nativeEvent.contentOffset.x - deviceWidthDp;
    console.log('contentOffsetX', offsetX);
    if (offsetX === this.scrollBeginContentOffsetX) {
      return;
    }
    var towardRight = offsetX > this.scrollBeginContentOffsetX;
    //特殊情况处理，当从第0页往前滑时，contentOffSet会变为最后一页的偏移量
    if (offsetX === 0 && (offsetX < 0 || offsetX > deviceWidthDp * 2)) {
      towardRight = false;
    }
    var targetPage = towardRight ? this.currentPage + 1 : this.currentPage - 1;
    var adjustedTargetPage = targetPage;
    if (targetPage >= 3) {
      adjustedTargetPage = targetPage - 3;
    } else if (targetPage < 0) {
      adjustedTargetPage = targetPage + 3;
    }
    console.log('targetPage', targetPage);
    console.log('adjustedTargetPage', adjustedTargetPage);

    const targetOffsetX = targetPage * deviceWidthDp;
    const ratio = 1 - Math.abs(offsetX - targetOffsetX) / deviceWidthDp;
    console.log('ratio', ratio);
    this.props.onScroll(ratio, this.currentPage, adjustedTargetPage);
  };
}

class Body extends Component<Props, State> {
  priceMap = {
    [FoodType.Patato]: 4,
    [FoodType.Coffee]: 3,
    [FoodType.Hamberger]: 6,
  };

  imageMap = {
    [FoodType.Patato]: require('../images/hamberger.png'),
    [FoodType.Coffee]: require('../images/coffee.png'),
    [FoodType.Hamberger]: require('../images/patato.png'),
  };

  allFoods = [FoodType.Patato, FoodType.Coffee, FoodType.Hamberger];

  amount = 0;

  star1Styles = [star1Style.patato, star1Style.coffee, star1Style.hamberger];

  star2Styles = [star2Style.patato, star2Style.coffee, star2Style.hamberger];

  star3Styles = [star3Style.patato, star3Style.coffee, star3Style.hamberger];

  constructor(props: Props) {
    super(props);
    this.state = {
      selectCoffee: true,
      selectHamberger: true,
      selectPatato: true,
      // currentPage: 0,
      star1Left: star1Style.patato.left,
      star1Top: star1Style.patato.top,
      star2Left: star2Style.patato.left,
      star2Top: star2Style.patato.top,
      star3Left: star3Style.patato.left,
      star3Top: star3Style.patato.top,
    };
  }

  onAddBtnPress = (index: FoodType) => {
    console.log('add foot index:' + index);
    this.amount = this.amount + this.priceMap[index];
    console.log('amount=' + this.amount);
    this.props.onAddFood(this.amount);
  };

  renderStartWithAmimationRatio = (
    ratio: number,
    currentPage: number,
    targetPage: number,
  ) => {
    const star1From = this.star1Styles[currentPage];
    const star1To = this.star1Styles[targetPage];

    const star2From = this.star2Styles[currentPage];
    const star2To = this.star2Styles[targetPage];

    const star3From = this.star3Styles[currentPage];
    const star3To = this.star3Styles[targetPage];

    this.setState({
      star1Left: (star1To.left - star1From.left) * ratio + star1From.left,
      star1Top: (star1To.top - star1From.top) * ratio + star1From.top,
      star2Left: (star2To.left - star2From.left) * ratio + star2From.left,
      star2Top: (star2To.top - star2From.top) * ratio + star2From.top,
      star3Left: (star3To.left - star3From.left) * ratio + star3From.left,
      star3Top: (star3To.top - star3From.top) * ratio + star3From.top,
    });
  };

  renderStars = () => {
    return (
      <Fragment>
        <Image
          source={require('../images/star.png')}
          style={[
            star1Style.basic,
            {left: this.state.star1Left, top: this.state.star1Top},
          ]}
          key={'star1'}
        />
        <Image
          source={require('../images/star.png')}
          style={[
            star2Style.basic,
            {left: this.state.star2Left, top: this.state.star2Top},
          ]}
          key={'star2'}
        />
        <Image
          source={require('../images/star.png')}
          style={[
            star3Style.basic,
            {left: this.state.star3Left, top: this.state.star3Top},
          ]}
          key={'star3'}
        />
      </Fragment>
    );
  };

  renderFoods = () => {
    const styles3 = [styles.hambergerIn3, styles.coffeeIn3, styles.patatoIn3];
    if (
      this.state.selectCoffee &&
      this.state.selectHamberger &&
      this.state.selectPatato
    ) {
      return (
        <Fragment>
          {this.allFoods.map((index: number) => {
            return (
              <Image
                source={this.imageMap[this.allFoods[index]]}
                style={styles3[index]}
                key={`selectedFood-${index}`}
              />
            );
          })}
        </Fragment>
      );
    }
  };

  render() {
    console.log('render body');
    return (
      <ScrollView key="body" style={styles.bodyContainer}>
        {this.renderStars()}

        <SwiperWrapper
          allFoods={this.allFoods}
          onScroll={this.renderStartWithAmimationRatio}
          onAddBtnPress={this.onAddBtnPress}
        />

        <View style={styles.foodBox}>
          <Image
            style={styles.plateImage}
            source={require('../images/plate.png')}
          />
          {this.renderFoods()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    // height: deviceHeightDp - headerHeight - footerHeight - statusBarHeight,
  },
  foodScrollView: {
    // width: deviceWidthDp * 3,
    height: 360,
  },

  foodBox: {
    marginBottom: 76,
    alignSelf: 'center',
  },

  plateImage: {},
  hambergerIn3: {
    position: 'absolute',
    left: 17,
    top: -21.3,
  },
  coffeeIn3: {
    position: 'absolute',
    left: 90.68,
    top: -82,
  },
  patatoIn3: {
    position: 'absolute',
    right: 33.55,
    top: -17.4,
  },
});

const star1Style = StyleSheet.create({
  basic: {
    position: 'absolute',
    width: scale(25),
    height: scale(27),
    zIndex: 2,
  },
  patato: {
    left: 172,
    top: 41,
  },
  coffee: {
    left: 152,
    top: 194,
  },
  hamberger: {
    left: 25,
    top: 190,
  },
});

const star2Style = StyleSheet.create({
  basic: {
    position: 'absolute',
    width: scale(15),
    height: scale(17),
    zIndex: 2,
  },
  patato: {
    left: 25,
    top: 141,
  },
  coffee: {
    left: 32,
    top: 207,
  },
  hamberger: {
    left: 39,
    top: 62,
  },
});

const star3Style = StyleSheet.create({
  basic: {
    position: 'absolute',
    width: scale(11),
    height: scale(13),
    zIndex: 2,
  },
  patato: {
    left: 209,
    top: 114,
  },
  coffee: {
    left: 167,
    top: 88,
  },
  hamberger: {
    left: 167,
    top: 230,
  },
});

export default Body;
