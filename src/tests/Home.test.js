import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Home } from '../screens/Home';

test("Home", async () => {
  const { getByTestId, getByText } = render(<Home />);

  const enterButton = getByTestId('enterButton');
  fireEvent.press(enterButton);
  await waitFor(() => expect(getByText('Campo obligatorio').props.style.opacity).toBe(1));

  const input = getByTestId('input');
  fireEvent.changeText(input, 'name');
  fireEvent.press(enterButton);
  await waitFor(() => expect(getByText('Campo obligatorio').props.style.opacity).toBe(0));
})