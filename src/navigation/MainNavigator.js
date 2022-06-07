import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Game } from '../screens/Game';
import { Ranking } from '../screens/Ranking';

const Stack = createStackNavigator();

export const MainNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Ranking" component={Ranking} />
    </Stack.Navigator>
  );
};
