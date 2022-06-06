import React, { useState } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);

  const styles = StyleSheet.create({
    view: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      marginBottom: 20,
    },
    input: {
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
      navigation.navigate('Game', { user: nameAux });
    } else {
      setShowError(true);
    }
  }

  const onClickRanking = () => {

  }

  return (
    <Provider>
      <SafeAreaView style={[{margin: 'auto'}]}>
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
          />
          <HelperText type="error" visible={showError}>
            Campo obligatorio
          </HelperText>

          <Button
            onPress={onClickButton}
            mode="contained"
            style={styles.button}
          >
            Entrar
          </Button>

          <Button
            onPress={onClickRanking}
            mode="contained"
            style={styles.button}
          >
            Ránking
          </Button>
        </View>
      </SafeAreaView>
    </Provider>
  );
};
