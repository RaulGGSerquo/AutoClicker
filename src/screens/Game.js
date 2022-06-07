import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatNumber, storeData, getData } from '../utils';

const BOOST_CLICK_COST = 25;
const AUTO_CLICKER_COST = 50;
const BOOST_GENERATOR_COST = 100;
const POLLING = 100;
const POLLING_STORE = 10000;

export const Game = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const pointsRef = useRef();
  const [boostAutoClickerCounter, setBoostAutoClickerCounter] = useState(0);
  const [autoClickerCost, setAutoClickerCost] = useState(AUTO_CLICKER_COST);
  const boostAutoClickerCounterRef = useRef();
  const [boostGeneratorCounter, setBoostGeneratorCounter] = useState(0);
  const [boostGeneratorCost, setBoostGeneratorCost] = useState(BOOST_GENERATOR_COST);
  const boostGeneratorCounterRef = useRef();
  const [boostClickCounter, setBoostClickCounter] = useState(0);
  const [boostClickCost, setBoostClickCost] = useState(BOOST_CLICK_COST);
  const boostClickCounterRef = useRef();
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
    textButton: {
      fontSize: 12,
      color: 'white',
    },
    icon: {
      marginRight: 5,
    }
  });

  React.useLayoutEffect(() => {
    navigation?.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          name="logout"
          size={25}
          style={{ marginRight: '5%' }}
          onPress={() => {
            setDataStore(name);
            navigation.pop();
          }}
        />
      ),
      title: `Hola ${name}`,
    });
  }, [navigation, name]);

  useEffect(() => {
    if (route?.params?.user) {
      setName(route.params?.user);
      getData(`@${route.params?.user}`).then(setData);

      const intervalStore = setInterval(() => {
        setDataStore(route.params.user);
      }, POLLING_STORE);
  
      return () => clearInterval(intervalStore);
    }
  }, []);

  useEffect(() => {
    if (boostAutoClickerCounter > 0) {
      clearInterval(autoClickerInterval);
      const interval = setInterval(() => {
        setPoints(current => current + (boostAutoClickerCounter * (boostGeneratorCounter + 1)));
        pointsRef.current = pointsRef.current + (boostAutoClickerCounter * (boostGeneratorCounter + 1));
      }, POLLING);
      setAutoClickerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [boostAutoClickerCounter, boostGeneratorCounter]);

  const setData = (data) => {
    if (data) {
      setPoints(data.points);
      pointsRef.current = data.points;

      setBoostClickCounter(data.boostClickCounter);
      boostClickCounterRef.current = data.boostClickCounter;
      setBoostClickCost(BOOST_CLICK_COST + data.boostClickCounter * BOOST_CLICK_COST);
      
      setBoostAutoClickerCounter(data.boostAutoClickerCounter);
      boostAutoClickerCounterRef.current = data.boostAutoClickerCounter;
      setAutoClickerCost(AUTO_CLICKER_COST + data.boostAutoClickerCounter * AUTO_CLICKER_COST);
      
      setBoostGeneratorCounter(data.boostGeneratorCounter);
      boostGeneratorCounterRef.current = data.boostGeneratorCounter;
      setBoostGeneratorCost(BOOST_GENERATOR_COST * Math.pow(2, data.boostGeneratorCounter));
    }
    else {
      pointsRef.current = 0;
      boostAutoClickerCounterRef.current = 0;
      boostGeneratorCounterRef.current = 0;
      boostClickCounterRef.current = 0;
      setDataStore(route.params?.user);
    }
  }

  const setDataStore = (key) => {
    const value = {
      points: pointsRef.current,
      boostAutoClickerCounter: boostAutoClickerCounterRef.current,
      boostGeneratorCounter: boostGeneratorCounterRef.current,
      boostClickCounter: boostClickCounterRef.current,
    };
    storeData(`@${key}`, value);
  }

  const onClickButton = () => {
    const pointsAux = points + 1 + boostClickCounter;
    setPoints(pointsAux);
    pointsRef.current = pointsAux;
  }

  const onClickAutoClicker = () => {
    const pointsAux = points - autoClickerCost;
    setPoints(pointsAux);
    pointsRef.current = pointsAux;
    const boostAutoClickerCounterAux = boostAutoClickerCounter + 1;
    setBoostAutoClickerCounter(boostAutoClickerCounterAux);
    setAutoClickerCost(AUTO_CLICKER_COST + boostAutoClickerCounterAux * AUTO_CLICKER_COST);
    boostAutoClickerCounterRef.current = boostAutoClickerCounterAux;
  }

  const onClickBoostClick = () => {
    const pointsAux = points - boostClickCost;
    setPoints(pointsAux);
    pointsRef.current = pointsAux;
    const boostClickAux = boostClickCounter + 1;
    setBoostClickCounter(boostClickAux);
    setBoostClickCost(BOOST_CLICK_COST + boostClickAux * BOOST_CLICK_COST);
    boostClickCounterRef.current = boostClickAux;
  }

  const onClickBoostGenerator = () => {
    const pointsAux = points - boostGeneratorCost;
    setPoints(pointsAux);
    pointsRef.current = pointsAux;
    const boostGeneratorAux = boostGeneratorCounter + 1;
    setBoostGeneratorCounter(boostGeneratorAux);
    setBoostGeneratorCost(current => current * 2);
    boostGeneratorCounterRef.current = boostGeneratorAux;
  }

  return (
    <Provider>
      <SafeAreaView style={[{marginTop: 100}]}>
        <View style={styles.view}>
          <Text style={styles.text}>Dinero generado</Text>
          <Text style={styles.points} testID="points">{formatNumber(points)} €</Text>

          <Button
            onPress={onClickButton}
            mode="contained"
            style={styles.buttons}
            testID="generateButton"
          >
            <Icon name="cash" size={20} style={styles.icon} />
            <Text style={styles.textButton}>Generar</Text>
          </Button>

          <Button
            onPress={onClickBoostClick}
            mode="contained"
            disabled={points < boostClickCost}
            style={styles.buttons}
            testID="boostClickButton"
          >
            <Icon name="shopping" size={20} style={styles.icon} />
            <Text style={styles.textButton}>Comprar mejora click ({formatNumber(boostClickCost)})</Text>
          </Button>

          {(points >= 50 || boostAutoClickerCounter > 0) && (
            <Button
              onPress={onClickAutoClicker}
              mode="contained"
              disabled={points < autoClickerCost}
              style={styles.buttons}
              testID="autoClickerButton"
            >
              <Icon name="shopping" size={20} style={styles.icon} />
              <Text style={styles.textButton}>Comprar generador ({formatNumber(autoClickerCost)})</Text>
            </Button>
          )}
          
          {boostAutoClickerCounter > 0 && (
            <Button
              onPress={onClickBoostGenerator}
              mode="contained"
              disabled={points < boostGeneratorCost}
              style={styles.buttons}
              testID="boostGeneratorButton"
            >
              <Icon name="shopping" size={20} style={styles.icon} />
              <Text style={styles.textButton}>Comprar mejora generador ({formatNumber(boostGeneratorCost)})</Text>
            </Button>
          )}
        </View>
      </SafeAreaView>
    </Provider>
  );
};
