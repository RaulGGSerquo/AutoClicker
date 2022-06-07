import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Provider,
  TextInput,
  HelperText,
  Button,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);

  const styles = StyleSheet.create({
    view: {
      paddingHorizontal: 20,
      paddingTop: 100,
      alignItems: 'center',
      height: '100%',
    },
    title: {
      fontSize: 50,
      marginBottom: 20,
      lineHeight: 50,
    },
    input: {
      width: '100%',
      maxWidth: 250,
      marginTop: 40,
      height: 40,
    },
    button: {
      width: '100%',
      maxWidth: 250,
      marginTop: 20,
    }
  });

  const onClickButton = () => {
    if (name) {
      const nameAux = name;
      setName('');
      setShowError(false);
      navigation?.navigate('Game', { user: nameAux });
    } else {
      setShowError(true);
    }
  }

  return (
    <Provider>
      <SafeAreaView>
        <View style={styles.view}>
          <Title style={styles.title}>AutoClicker</Title>
          <Icon name='cursor-default-click-outline' size={60} />

          <TextInput
            mode="outlined"
            label="Nombre*"
            error={showError}
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            testID='input'
          />
          <HelperText type="error" visible={showError}>
            Campo obligatorio
          </HelperText>

          <Button
            testID='enterButton'
            onPress={onClickButton}
            mode="contained"
            style={styles.button}
          >
            Entrar
          </Button>

          <Button
            onPress={() => navigation?.navigate('Ranking')}
            mode="contained"
            style={styles.button}
          >
            Ranking
          </Button>
        </View>
      </SafeAreaView>
    </Provider>
  );
};
