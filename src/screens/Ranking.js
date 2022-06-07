import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, Divider, Text } from 'react-native-paper';
import { formatNumber, getAllStore } from '../utils';

export const Ranking = ({ navigation, route }) => {
  const [users, setUser] = useState([]);

  const styles = StyleSheet.create({
    view: {
      padding: 30,
      width: '100%',
    },
    record: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    text: {
      fontSize: 20,
    },
    divider: {
      marginVertical: 10,
    },
    noData: {
      fontSize: 22,
      textAlign: 'center'
    }
  });

  useEffect(() => {
    getAllStore().then(tranformData)
  }, []);

  const tranformData = (data) => {
    if (data) {
      const finalData = data.map(elem => {
        const obj = JSON.parse(elem[1]);
        obj['name'] = elem[0].replace('@', '');
        return obj;
      });
      finalData.sort((a, b) => b.points - a.points);
      setUser(finalData);
    }
  }

  return (
    <Provider>
      <SafeAreaView style={styles.view}>
        {users.length > 0 ? (
          <ScrollView>
            {users.map((user, index) => {
              return <>
                <View style={styles.record}>
                  <Text style={styles.text}>{index + 1}. {user.name}</Text>
                  <Text style={styles.text}>{formatNumber(user.points)} €</Text>
                </View>
                <Divider style={styles.divider} />
              </>
            })}
          </ScrollView>
        )
        : (
          <Text style={styles.noData}>No hay usuarios</Text>
        )}
      </SafeAreaView>
    </Provider>
  );
};
