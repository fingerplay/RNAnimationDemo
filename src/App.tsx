/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Footer from './components/Footer';
import Header from './components/Header';
import Body from './components/Body';

const onPayBtnPress = () => {
  console.log('pay btn pressed');
};

const onMenuItemPress = (index: number) => {
  console.log('munu item pressed index=' + index);
};

function App(): JSX.Element {
  const [amount, setAmount] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <LinearGradient
        colors={['#f5f5f5', '#ffeded']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.pageContainer}>
        <Header onItemPress={onMenuItemPress} />
        <Body
          onAddFood={(amount1: number) => {
            setAmount(amount1);
          }}
        />
        <Footer onPayBtnPress={onPayBtnPress} amount={amount} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  pageContainer: {
    height: '100%',
  },
});

export default App;
