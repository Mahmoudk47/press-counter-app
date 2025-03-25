import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const savedCount = await AsyncStorage.getItem('pressCount');
      if (savedCount !== null) setCount(parseInt(savedCount));
    };
    loadCount();
  }, []);

  const handlePress = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await AsyncStorage.setItem('pressCount', newCount.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Presses: {count}</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20 },
});
