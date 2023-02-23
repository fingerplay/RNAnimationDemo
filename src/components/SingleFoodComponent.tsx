import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, LayoutChangeEvent} from 'react-native';
import {deviceWidthDp, scale} from '../util/P2D';

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export enum FoodType {
  Patato,
  Coffee,
  Hamberger,
}

export enum AnimationState {
  None,
  FadeIn,
  FadeOut,
}

type Props = {
  type: FoodType;
  onAddBtnPress: (type: FoodType) => void;
};

type State = {
  textTranslateY: number;
  textOpacity: number;
  imageTranslateY: number;
  waterScale: number;
};

class SingleFoodComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textTranslateY: 0,
      textOpacity: 1,
      imageTranslateY: 0,
      waterScale: 0,
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
  ): boolean {
    if (
      nextState.textOpacity === this.state.textOpacity &&
      nextState.textTranslateY === this.state.textTranslateY &&
      nextState.imageTranslateY === this.state.imageTranslateY &&
      nextState.waterScale === this.state.waterScale
    ) {
      return false;
    }
    return true;
  }

  renderPatatoImage = () => {
    console.log(
      'renderPatatoImage,this.state.imageTranslateY=',
      this.state.imageTranslateY,
    );
    return (
      <View>
        <Image
          source={require('../images/patato-big.png')}
          style={patatoStyle.bigImage}
        />
        <Image
          source={require('../images/patato1.png')}
          style={[
            patatoStyle.small1,
            {transform: [{translateY: this.state.imageTranslateY}]},
          ]}
        />
        <Image
          source={require('../images/patato2.png')}
          style={[
            patatoStyle.small2,
            {transform: [{translateY: this.state.imageTranslateY}]},
          ]}
        />
        <View style={[styles.rightBox, {opacity: this.state.textOpacity}]}>
          <View style={{transform: [{translateY: this.state.textTranslateY}]}}>
            <Text style={styles.title}>FRIES</Text>
            <Text style={styles.price}>4$</Text>
          </View>
        </View>
      </View>
    );
  };

  renderCoffeeImage = () => {
    console.log('renderCoffeeImage');

    return (
      <View>
        <Image
          source={require('../images/coffee-big.png')}
          style={coffeeStyle.bigImage}
        />
        <Image
          source={require('../images/water.png')}
          style={[
            coffeeStyle.water,
            {transform: [{scale: this.state.waterScale}]},
          ]}
        />
        <View style={[styles.rightBox, {opacity: this.state.textOpacity}]}>
          <View style={{transform: [{translateY: this.state.textTranslateY}]}}>
            <Text style={styles.title}>LATTE</Text>
            <Text style={styles.price}>3$</Text>
          </View>
        </View>
      </View>
    );
  };

  renderHambergerImage = () => {
    console.log('renderHambergerImage');
    return (
      <View>
        <Image
          source={require('../images/hamberger-up.png')}
          style={[
            hambergerStyle.upImage,
            {transform: [{translateY: this.state.imageTranslateY}]},
          ]}
        />
        <Image
          source={require('../images/hamberger-down.png')}
          style={hambergerStyle.downImage}
        />
        <View style={[styles.rightBox, {opacity: this.state.textOpacity}]}>
          <View style={{transform: [{translateY: this.state.textTranslateY}]}}>
            <Text style={styles.title}>BURGER</Text>
            <Text style={styles.price}>6$</Text>
          </View>
        </View>
      </View>
    );
  };

  setAnimationState(animationState: AnimationState, animationRate: number) {
    console.log('type:'+ this.props.type+'  state:'+animationState+'  rate:'+animationRate);
    var translateY = 0;
    var opacity = 1;
    const textRate = animationRate <= 0.25 ? animationRate * 4 : 1;
    if (animationState === AnimationState.FadeIn) {
      translateY = 40 * (textRate - 1);
      opacity = textRate;
    } else if (animationState === AnimationState.FadeOut) {
      translateY = 40 * textRate;
      opacity = 1 - textRate;
    }
    // console.log('type:'+ this.props.type+'  translateY:'+translateY+'  opacity:'+opacity);
    if (animationState !== AnimationState.None) {
      this.setState({textTranslateY: translateY, textOpacity: opacity});
    }
    //薯条飞出
    if (this.props.type === FoodType.Patato) {
      if (animationState === AnimationState.FadeIn) {
        this.setState({imageTranslateY: -50 * (animationRate - 1)});
      } else if (animationState === AnimationState.FadeOut) {
        this.setState({imageTranslateY: 50 * animationRate});
      }
    }

    //水滴飞出
    if (this.props.type === FoodType.Coffee) {
      if (animationState === AnimationState.FadeIn) {
        this.setState({waterScale: animationRate});
      } else if (animationState === AnimationState.FadeOut) {
        this.setState({waterScale: 1 - animationRate});
      }
    }
    //汉堡飞出
    if (this.props.type === FoodType.Hamberger) {
      if (animationState === AnimationState.FadeIn) {
        this.setState({imageTranslateY: -40 * animationRate});
      } else if (animationState === AnimationState.FadeOut) {
        this.setState({imageTranslateY: -40 * (1 - animationRate)});
      }
    }
  }

  render() {
    var renderImage;
    if (this.props.type === FoodType.Patato) {
      renderImage = this.renderPatatoImage;
    } else if (this.props.type === FoodType.Coffee) {
      renderImage = this.renderCoffeeImage;
    } else {
      renderImage = this.renderHambergerImage;
    }
    // console.log('render singleFoodComponent,key='+ this.key +',type=' + this.props.type);

    return (
      <View key="body" style={styles.bodyContainer}>
        {renderImage()}
      </View>
    );
  }
}

const patatoStyle = StyleSheet.create({
  bigImage: {
    top: 40,
    left: 10.25,
    zIndex: 2,
  },
  small1: {
    position: 'absolute',
    left: 43.72,
    top: -34,
    zIndex: 1,
    // backgroundColor:"red",
  },
  small2: {
    position: 'absolute',
    left: 6.41,
    top: 6.41,
    zIndex: 1,
    // backgroundColor: "white",
  },
});

const coffeeStyle = StyleSheet.create({
  bigImage: {
    top: 27.56,
    left: -13.61,
    zIndex: 1,
  },
  water: {
    position: 'absolute',
    left: -7.25,
    top: -10,
    zIndex: 2,
  },
});

const hambergerStyle = StyleSheet.create({
  downImage: {
    top: 76,
    left: 32,
  },
  upImage: {
    position: 'absolute',
    zIndex: 2,
    top: 76,
    left: 50,
  },
});

const styles = StyleSheet.create({
  bodyContainer: {
    height: 390,
    width: deviceWidthDp,
    // height: deviceHeightDp - headerHeight - footerHeight - statusBarHeight,
  },
  rightBox: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-end',
    right: scale(48),
  },

  textBox: {},

  title: {
    marginTop: 79,
    fontSize: 32,
    fontWeight: '600',
    color: '#EB5C77',
  },
  price: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '300',
    color: '#EB5C77',
  },
});

export default SingleFoodComponent;
