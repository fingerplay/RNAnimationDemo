import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {deviceWidthDp, scale} from '../util/P2D';
import {FoodType} from './SingleFoodComponent';
import {SwiperWrapper} from './SwiperWrapper';

type Props = {
  onAddFood: (amount: number) => void;
};
type State = {
  // foodTranslateX: Array<number>;
  star1Left: number;
  star1Top: number;
  star2Left: number;
  star2Top: number;
  star3Left: number;
  star3Top: number;
  addBtnOpacity: number;
};
class Body extends Component<Props, State> {
  priceMap = {
    [FoodType.Patato]: 4,
    [FoodType.Coffee]: 3,
    [FoodType.Hamberger]: 6,
  };

  imageMap = {
    [FoodType.Patato]: require('../images/patato.png'),
    [FoodType.Coffee]: require('../images/coffee.png'),
    [FoodType.Hamberger]: require('../images/hamberger.png'),
  };

  allFoods = [FoodType.Patato, FoodType.Coffee, FoodType.Hamberger];
  addBtnLeft = deviceWidthDp - styles.addBtn.right - styles.addBtn.width;
  foodTranslateXY = {
    [FoodType.Patato]: new Animated.ValueXY({
      x:
        this.addBtnLeft -
        styles.patatoIn3.left -
        (deviceWidthDp - 276) / 2 -
        20,
      y: -styles.patatoIn3.top - 150,
    }),
    [FoodType.Coffee]: new Animated.ValueXY({
      x:
        this.addBtnLeft -
        styles.coffeeIn3.left -
        (deviceWidthDp - 276) / 2 -
        40,
      y: -styles.coffeeIn3.top - 150,
    }),
    [FoodType.Hamberger]: new Animated.ValueXY({
      x:
        this.addBtnLeft -
        styles.hambergerIn3.left -
        (deviceWidthDp - 276) / 2 -
        50,
      y: -styles.hambergerIn3.top - 150,
    }),
  };
  foodScaleMap = {
    [FoodType.Patato]: new Animated.Value(0),
    [FoodType.Coffee]: new Animated.Value(0),
    [FoodType.Hamberger]: new Animated.Value(0),
  };

  amount = 0;

  currentPage = 0;

  selectedFoods: Array<FoodType> = [];

  star1Styles = [star1Style.patato, star1Style.coffee, star1Style.hamberger];

  star2Styles = [star2Style.patato, star2Style.coffee, star2Style.hamberger];

  star3Styles = [star3Style.patato, star3Style.coffee, star3Style.hamberger];

  constructor(props: Props) {
    super(props);
    this.state = {
      // foodTranslateX: [0, 0, 0],
      star1Left: star1Style.patato.left,
      star1Top: star1Style.patato.top,
      star2Left: star2Style.patato.left,
      star2Top: star2Style.patato.top,
      star3Left: star3Style.patato.left,
      star3Top: star3Style.patato.top,
      addBtnOpacity: 1,
    };
  }

  onAddBtnPress = (index: FoodType) => {
    console.log('add foot index:' + index);
    if (this.selectedFoods.length >= 3) {
      return;
    } else if (this.selectedFoods.length === 2) {
      const food = this.allFoods[index];
      if (this.selectedFoods.indexOf(food) === -1) {
        if (food === FoodType.Patato) {
          this.selectedFoods.push(food);
        } else if (food === FoodType.Coffee) {
          this.selectedFoods.splice(1, 0, food);
        } else {
          this.selectedFoods.unshift(food);
        }
      } else {
        return;
      }
    } else {
      const food = this.allFoods[index];
      if (this.selectedFoods.indexOf(food) === -1) {
        if (this.selectedFoods.length === 1) {
          if (this.selectedFoods[0] < food) {
            this.selectedFoods.unshift(food);
          } else {
            this.selectedFoods.push(food);
          }
        } else {
          this.selectedFoods.push(food);
        }
      } else {
        return;
      }
    }
    this.addFoodAnimations(this.allFoods[index]);

    this.amount = this.amount + this.priceMap[index];
    console.log('amount=' + this.amount);
    this.props.onAddFood(this.amount);
  };

  addFoodAnimations = (newAddFood: FoodType) => {
    var animations: Array<Animated.CompositeAnimation> = [];
    var translateXValues;
    if (this.selectedFoods.length === 3) {
      translateXValues = [-50, 0, 50];
    } else if (this.selectedFoods.length === 2) {
      translateXValues = [-30, 30, 0];
    } else {
      translateXValues = [0, 0, 0];
    }
    console.log(this.selectedFoods);
    for (var i = 0; i < this.selectedFoods.length; i++) {
      const food = this.selectedFoods[i];
      var fromValue = this.foodTranslateXY[food];
      // console.log(
      //   'move item:' + food + ' from:',
      //   // fromValue._value,
      //   ' to:' + translateXValues[i],
      // );

      animations.push(
        Animated.timing(fromValue, {
          toValue: {x: translateXValues[i], y: 0},
          useNativeDriver: true,
          duration: 200,
        }),
      );
    }
    animations.push(
      Animated.timing(this.foodScaleMap[newAddFood], {
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
      }),
    );

    Animated.parallel(animations, {stopTogether: false}).start();
  };

  renderStarAndBtnWithAmimationRatio = (
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

    // console.log('ratio', ratio);

    const btnOpacity =
      ratio <= 0.25 ? 1 - ratio * 4 : ratio >= 0.75 ? (ratio - 0.5) * 4 : 0;
    // console.log('btnOpacity', btnOpacity);
    this.setState({
      star1Left: (star1To.left - star1From.left) * ratio + star1From.left,
      star1Top: (star1To.top - star1From.top) * ratio + star1From.top,
      star2Left: (star2To.left - star2From.left) * ratio + star2From.left,
      star2Top: (star2To.top - star2From.top) * ratio + star2From.top,
      star3Left: (star3To.left - star3From.left) * ratio + star3From.left,
      star3Top: (star3To.top - star3From.top) * ratio + star3From.top,
      addBtnOpacity: btnOpacity,
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

  renderAddBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onAddBtnPress(this.currentPage);
        }}
        style={[styles.addBtn, {opacity: this.state.addBtnOpacity}]}>
        <Image source={require('../images/add.png')} style={styles.addImage} />
      </TouchableOpacity>
    );
  };

  renderFoods = () => {
    const styles3 = {
      [FoodType.Hamberger]: styles.hambergerIn3,
      [FoodType.Coffee]: styles.coffeeIn3,
      [FoodType.Patato]: styles.patatoIn3,
    };
    return (
      <Fragment>
        {this.selectedFoods.map((item: FoodType) => {
          return (
            <Animated.Image
              source={this.imageMap[item]}
              style={[
                styles3[item],
                {
                  transform: [
                    {translateX: this.foodTranslateXY[item].x},
                    {translateY: this.foodTranslateXY[item].y},
                    {scale: this.foodScaleMap[item]},
                  ],
                },
              ]}
              key={`selectedFood-${item}`}
            />
          );
        })}
      </Fragment>
    );
  };

  render() {
    console.log('render body');
    return (
      <ScrollView key="body" style={styles.bodyContainer}>
        {this.renderStars()}
        {this.renderAddBtn()}
        <SwiperWrapper
          allFoods={this.allFoods}
          onScroll={this.renderStarAndBtnWithAmimationRatio}
          onAddBtnPress={this.onAddBtnPress}
          onIndexChanged={(index: number) => {
            this.currentPage = index;
          }}
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

  addBtn: {
    position: 'absolute',
    right: 48,
    top: 178,
    width: 59,
    height: 59,
    padding: 0,
    zIndex: 4,
  },
  addImage: {
    transform: [{translateX: -15}],
  },

  foodBox: {
    marginBottom: 76,
    alignSelf: 'center',
  },

  plateImage: {},
  hambergerIn3: {
    position: 'absolute',
    // left: 17,
    left: 47,
    top: -21.3,
    zIndex: 3,
  },
  coffeeIn3: {
    position: 'absolute',
    // left: 90.68,
    left: 70,
    top: -82,
    zIndex: 2,
  },
  patatoIn3: {
    position: 'absolute',
    // right: 33.55,
    left: 80,
    top: -17.4,
    zIndex: 3,
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
