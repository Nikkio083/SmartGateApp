import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Targhe = () => {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const pickImage = async () => {
    closeMenu();

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    closeMenu();

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const uploadFace = async () => {
    if (!image) {
      Alert.alert('No image selected!');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'face.jpg', // or use a dynamic name based on the image file
      type: 'image/jpeg', // or the correct MIME type
    });

    try {
      const response = await fetch('http://192.168.187.113:5000/upload_face', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      Alert.alert(data.message);
      setImage(null); // Reset image after upload
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to upload image.');
    }
  };

  const addPlate = async () => {
    if (!licensePlate) {
      Alert.alert('Please enter a license plate!');
      return;
    }

    try {
      const response = await fetch('http://your-server-ip:5000/add_plate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plate: licensePlate }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(data.message);
        setLicensePlate(''); // Clear input after submission
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to add plate.');
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Targa</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <LinearGradient colors={['#ff1b6b', '#45caff']} style={styles.iconButton}>
                <Ionicons name="add" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          }
          style={styles.menu}
        >
          <Menu.Item onPress={pickImage} title="Seleziona Foto" leadingIcon={() => <Ionicons name="images-outline" size={24} color="black" />} />
          <Menu.Item onPress={takePhoto} title="Scatta Foto" leadingIcon={() => <Ionicons name="camera-outline" size={24} color="black" />} />
        </Menu>
        {image && (
          <View>
            <Image source={{ uri: image }} style={styles.image} />
            <Button onPress={uploadFace}>Upload Face</Button>
          </View>
        )}
        <TextInput
          value={licensePlate}
          onChangeText={setLicensePlate}
          placeholder="Enter License Plate"
          style={styles.input}
        />
        <Button onPress={addPlate}>Add Plate</Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  menu: {
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default Targhe;
