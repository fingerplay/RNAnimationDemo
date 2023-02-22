import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {deviceWidthDp} from '../util/P2D';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  onItemPress: (index: number) => void;
};

class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const images = [
      require('../images/recommend-top.png'),
      require('../images/hamberger-top.png'),
      require('../images/watercup-top.png'),
      require('../images/snack-top.png'),
    ];

    return (
      <LinearGradient
        colors={['#FF5D79', '#FD003C']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.headerContainer}
        key="header">
        {images.map((imageRef: number, index: number) => {
          return (
            <TouchableOpacity
              style={styles.imageBox}
              key={index}
              onPress={() => {
                this.props.onItemPress(index);
              }}>
              <Image source={imageRef} />
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: '#FD003C',
    height: 73,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidthDp / 4,
  },
});

export default Header;
