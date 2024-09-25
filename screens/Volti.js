import React, { useState } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const SERVER_URL_FACE = 'http://192.168.1.19:5000/upload_face';
const SERVER_URL_PLATE = 'http://192.168.1.19:5000/upload_plate';

export default function App() {
  const [faceName, setFaceName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Richiede l'accesso alla fotocamera o alla galleria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  // Funzione per caricare il volto sul server
  const uploadFace = async () => {
    if (!selectedImage || !faceName) {
      Alert.alert('Errore', 'Seleziona un volto e inserisci un nome.');
      return;
    }

    let image = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });

    let formData = new FormData();
    formData.append('name', faceName);
    formData.append('image', {
      uri: selectedImage,
      name: 'face.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(SERVER_URL_FACE, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await response.json();
      Alert.alert('Risposta Server', json.message);
    } catch (error) {
      Alert.alert('Errore', 'Errore durante il caricamento del volto.');
      console.error(error);
    }
  };

  // Funzione per caricare la targa sul server
  const uploadLicensePlate = async () => {
    if (!licensePlate) {
      Alert.alert('Errore', 'Inserisci una targa.');
      return;
    }

    let formData = new FormData();
    formData.append('plate_text', licensePlate);

    try {
      const response = await fetch(SERVER_URL_PLATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await response.json();
      Alert.alert('Risposta Server', json.message);
    } catch (error) {
      Alert.alert('Errore', 'Errore durante il caricamento della targa.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carica Volto</Text>

      <Button title="Seleziona Immagine" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Inserisci Nome del Volto"
        value={faceName}
        onChangeText={setFaceName}
      />
      <Button title="Carica Volto" onPress={uploadFace} />

      <Text style={styles.title}>Carica Targa</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci Targa"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />
      <Button title="Carica Targa" onPress={uploadLicensePlate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
