import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Game } from '../screens/Game';

test("Game", async () => {
  const { getByTestId } = render(<Game />);

  const points = getByTestId('points');
  const generateButton = getByTestId('generateButton');
  const boostClickButton = getByTestId('boostClickButton');

  expect(points.children[0]).toBe("0");

  for (let i = 0; i < 25; i++) {
    fireEvent.press(generateButton);
  }
  
  expect(points.children[0]).toBe("25");
  fireEvent.press(boostClickButton);
  expect(points.children[0]).toBe("0");

  for (let i = 0; i < 25; i++) {
    fireEvent.press(generateButton);
  }

  expect(points.children[0]).toBe("50");

  const autoClickerButton = getByTestId('autoClickerButton');
  fireEvent.press(autoClickerButton);

  await waitFor(() => expect(points.children[0]).not.toBe("0"));
})