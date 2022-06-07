import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    return null;
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const getAllStore = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch(e) {
    return [];
  }
};

export { storeData, getData, getAllStore };