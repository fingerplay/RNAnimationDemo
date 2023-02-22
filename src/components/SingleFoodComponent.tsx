import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {deviceWidthDp, scale} from '../util/P2D';

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export enum FoodType {
  Patato,
  Coffee,
  Hamberger,
}

type Props = {
  type: FoodType;
  onAddBtnPress: (type: FoodType) => void;
};

class SingleFoodComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    if (this.props.type === nextProps.type) {
      return false;
    }
    return true;
  }

  renderPatatoImage = () => {
    return (
      <View>
        <Image
          source={require('../images/patato-big.png')}
          style={patatoStyle.bigImage}
        />
        <View style={styles.rightBox}>
          <Text style={styles.title}>FRIES</Text>
          <Text style={styles.price}>4$</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.onAddBtnPress(FoodType.Patato);
            }}
            style={styles.addBtn}>
            <Image
              source={require('../images/add.png')}
              style={styles.addImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderCoffeeImage = () => {
    return (
      <View>
        <Image
          source={require('../images/coffee-big.png')}
          style={coffeeStyle.bigImage}
        />
        <View style={styles.rightBox}>
          <Text style={styles.title}>LATTE</Text>
          <Text style={styles.price}>3$</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.onAddBtnPress(FoodType.Coffee);
            }}
            style={styles.addBtn}>
            <Image
              source={require('../images/add.png')}
              style={styles.addImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHambergerImage = () => {
    return (
      <View>
        <Image
          source={require('../images/hamberger-big.png')}
          style={hambergerStyle.bigImage}
        />
        <View style={styles.rightBox}>
          <Text style={styles.title}>BURGER</Text>
          <Text style={styles.price}>6$</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.onAddBtnPress(FoodType.Hamberger);
            }}
            style={styles.addBtn}>
            <Image
              source={require('../images/add.png')}
              style={styles.addImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    var renderImage;
    if (this.props.type === FoodType.Patato) {
      renderImage = this.renderPatatoImage;
    } else if (this.props.type === FoodType.Coffee) {
      renderImage = this.renderCoffeeImage;
    } else {
      renderImage = this.renderHambergerImage;
    }
    console.log('render singleFoodComponent,type=' + this.props.type);

    return (
      <View key="body" style={styles.bodyContainer}>
        {renderImage()}
      </View>
    );
  }
}

const patatoStyle = StyleSheet.create({
  bigImage: {
    top: -70,
    // width: scale(245),
    // height: scale(278),
  },
  star1: {
    position: 'absolute',
    left: 172,
    top: 41,
    width: scale(25),
    height: scale(27),
  },
  star2: {
    position: 'absolute',
    left: 25,
    top: 141,
    width: scale(15),
    height: scale(17),
  },
  star3: {
    position: 'absolute',
    left: 209,
    top: 114,
    width: scale(11),
    height: scale(13),
  },
});

const coffeeStyle = StyleSheet.create({
  bigImage: {
    top: -16,
    left: -5,
  },
  star1: {
    position: 'absolute',
    left: 152,
    top: 194,
    width: scale(25),
    height: scale(27),
  },
  star2: {
    position: 'absolute',
    left: 32,
    top: 207,
    width: scale(15),
    height: scale(17),
  },
  star3: {
    position: 'absolute',
    left: 167,
    top: 88,
    width: scale(11),
    height: scale(13),
  },
});

const hambergerStyle = StyleSheet.create({
  bigImage: {
    top: 36,
    left: 10,
  },
  star1: {
    position: 'absolute',
    left: 25,
    top: 190,
    width: scale(25),
    height: scale(27),
  },
  star2: {
    position: 'absolute',
    left: 39,
    top: 62,
    width: scale(15),
    height: scale(17),
  },
  star3: {
    position: 'absolute',
    left: 167,
    top: 230,
    width: scale(11),
    height: scale(13),
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
  addBtn: {
    marginTop: 49,
    width: 59,
    height: 59,
    padding: 0,
  },
  addImage: {
    transform: [{translateX: -15}],
  },
});

export default SingleFoodComponent;
