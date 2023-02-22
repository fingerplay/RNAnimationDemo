import React, {Component, Fragment} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import {scale} from '../util/P2D';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  onPayBtnPress: () => void;
  amount: number;
};

class Footer extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <View style={styles.addressAndPhone}>
          <Image
            source={require('../images/location.png')}
            style={styles.addressImage}
          />
          <Text style={styles.addressText} numberOfLines={2}>
            Dongcheng District Metro Cultural Building
          </Text>
          <Image
            source={require('../images/phone.png')}
            style={styles.phoneImage}
          />
        </View>
        <View key="footer" style={styles.footerContainer}>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{this.props.amount}</Text>
            <Text style={styles.priceUnit}>$</Text>
          </View>

          <LinearGradient
            colors={['#FD003C', '#FF5D79']}
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.payBox}>
            <TouchableOpacity onPress={this.props.onPayBtnPress}>
              <Text style={styles.payText}>Pay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  priceBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 20,
  },

  priceText: {
    fontSize: 44,
    fontWeight: '600',
    color: '#4f4f4f',
    // marginTop: 16,
    // marginBottom: 6,
  },

  priceUnit: {
    fontSize: 30,
    color: '#4f4f4f',
    transform: [{translateY: -5}],
  },

  payBox: {
    position: 'absolute',
    right: 0,
    width: scale(143),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  payText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff',
  },
  addressAndPhone: {
    position: 'absolute',
    bottom: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressImage: {
    marginLeft: 22,
  },
  addressText: {
    marginLeft: 17,
    marginRight: 18,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    color: '#606060',
  },
  phoneImage: {
    marginRight: 32,
  },
});

export default Footer;
