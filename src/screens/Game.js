import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Provider,
  TextInput,
  HelperText,
  Button,
  Text,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatNumber } from '../utils';

const BOOST_CLICK_COST = 25;
const AUTO_CLICKER_COST = 50;
const BOOST_GENERATOR_COST = 100;
const POLLING = 100;

export const Game = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [boostAutoClickerCounter, setBoostAutoClickerCounter] = useState(0);
  const [autoClickerCost, setAutoClickerCost] = useState(AUTO_CLICKER_COST);
  const [boostGeneratorCounter, setBoostGeneratorCounter] = useState(0);
  const [boostGeneratorCost, setBoostGeneratorCost] = useState(BOOST_GENERATOR_COST);
  const [boostClickCounter, setBoostClickCounter] = useState(0);
  const [boostClickCost, setBoostClickCost] = useState(BOOST_CLICK_COST);
  const [autoClickerInterval, setAutoClickerInterval] = useState(null);

  const styles = StyleSheet.create({
    view: {
      padding: 20,
      alignItems: 'center',
    },
    text: {
      fontSize: 40,
      marginBottom: 10,
    },
    points: {
      fontSize: 35,
      marginBottom: 20,
    },
    buttons: {
      width: '100%',
      marginBottom: 10,
    },
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          name="sign-out-alt"
          size={25}
          style={{ marginRight: '5%' }}
          onPress={() => {
            navigation.pop();
          }}
        />
      ),
      title: `Hola ${name}`,
    });
  }, [navigation, name]);

  useEffect(() => {
    if (route.params?.user) {
      setName(route.params?.user);
    } else {
      navigation.pop();
    }
  }, []);

  useEffect(() => {
    if (boostAutoClickerCounter > 0) {
      clearInterval(autoClickerInterval);
      const interval = setInterval(() => {
        setCount(current => current + (boostAutoClickerCounter * (boostGeneratorCounter + 1)));
      }, POLLING);
      setAutoClickerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [boostAutoClickerCounter, boostGeneratorCounter])

  const onClickButton = () => {
    setCount(current => current + 1 + boostClickCounter);
  }

  const onClickAutoClicker = () => {
    setCount(current => current - autoClickerCost);
    const boostAutoClickerCounterAux = boostAutoClickerCounter + 1;
    setBoostAutoClickerCounter(boostAutoClickerCounterAux);
    setAutoClickerCost(AUTO_CLICKER_COST + boostAutoClickerCounterAux * AUTO_CLICKER_COST);
  }

  const onClickBoostClick = () => {
    setCount(current => current - boostClickCost);
    const boostClickAux = boostClickCounter + 1;
    setBoostClickCounter(boostClickAux);
    setBoostClickCost(BOOST_CLICK_COST + boostClickAux * BOOST_CLICK_COST);
  }

  const onClickBoostGenerator = () => {
    setCount(current => current - boostGeneratorCost);
    const boostGeneratorAux = boostGeneratorCounter + 1;
    setBoostGeneratorCounter(boostGeneratorAux);
    setBoostGeneratorCost(BOOST_GENERATOR_COST + boostGeneratorAux * BOOST_GENERATOR_COST * 5);
  }

  return (
    <Provider>
      <SafeAreaView style={[{marginTop: 100}]}>
        <View style={styles.view}>
          <Text style={styles.text}>Dinero generado</Text>
          <Text style={styles.points}>{formatNumber(count)} €</Text>

          <Button
            onPress={onClickButton}
            mode="contained"
            style={styles.buttons}
          >
            Generar
          </Button>

          <Button
            onPress={onClickBoostClick}
            mode="contained"
            disabled={count < boostClickCost}
            style={styles.buttons}
          >
            Comprar mejora click ({formatNumber(boostClickCost)})
          </Button>

          {(count >= 50 || boostAutoClickerCounter > 0) && (
            <Button
              onPress={onClickAutoClicker}
              mode="contained"
              disabled={count < autoClickerCost}
              style={styles.buttons}
            >
              Comprar generador ({formatNumber(autoClickerCost)})
            </Button>
          )}
          
          {boostAutoClickerCounter > 0 && (
            <Button
              onPress={onClickBoostGenerator}
              mode="contained"
              disabled={count < boostGeneratorCost}
              style={styles.buttons}
            >
              Comprar mejora generador ({formatNumber(boostGeneratorCost)})
            </Button>
          )}
          
        </View>
      </SafeAreaView>
    </Provider>
  );
};
