import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Modes"
        onPress={() => navigation.navigate('Mode')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
})
