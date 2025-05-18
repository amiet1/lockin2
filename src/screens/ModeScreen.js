// pages/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { handleMode } from '../services/api/modeHandler';
import { Button } from 'react-native';

export default function ModeScreen({ navigation }) {
  const [mode, setMode] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch suggestions based on the selected mode
  const fetchSuggestions = async (selectedMode) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await handleMode(selectedMode, ['i want to be creative']);
      if (result.hasError) {
        setError('Failed to fetch suggestions.');
      } else {
        setSuggestions(result.response);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle mode selection
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setSuggestions(''); // Clear previous suggestions
    if (selectedMode) {
      fetchSuggestions(selectedMode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Mode</Text>

      <Picker
        selectedValue={mode}
        onValueChange={handleModeChange}
        style={styles.picker}>
        <Picker.Item label="-- Choose a Mode --" value="" />
        <Picker.Item label="Creative Mode" value="Creative Mode" />
        <Picker.Item label="Social Break Mode" value="Social Break Mode" />
        <Picker.Item label="Drunk Mode" value="Drunk Mode" />
        <Picker.Item label="Focus Mode" value="Focus Mode" />
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : suggestions ? (
        <View>
          <Text style={styles.subtitle}>Suggestions for {mode}</Text>
          <Text style={styles.suggestions}>{suggestions}</Text>
        </View>
      ) : (
        mode && <Text>Select a mode to get suggestions.</Text>
      )}

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}