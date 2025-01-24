import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Admin from '../../models/Admin';
import {Picker} from '@react-native-picker/picker';

export default function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [adminLevel, setAdminLevel] = useState('LevelOne');

  const handlePickerValueChange = itemValue => {
    setAdminLevel(itemValue);
  };

  const handleRegisterUser = () => {
    if (!id || !name || !email || !adminLevel) {
      Alert.alert('All fields required!');
      return;
    }
    const checkExistingId = users.find(user => user.id === id);

    if (checkExistingId) {
      Alert.alert('Unique Id required!');
      return;
    }
    const newAdmin = new Admin(id, name, email, adminLevel);
    setCurrentAdmin(newAdmin);
    setUsers([...users, newAdmin]);
    setId('');
    setName('');
    setEmail('');
  };

  const handleNavigateTo = (screen, currentAdmin, userList) => {
    navigation.navigate(screen, {admin: currentAdmin, users: userList});
  };

  useEffect(() => {
    console.log('User list', users);
  }, [users]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Register User</Text>
        <TextInput
          placeholder="ID"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={adminLevel}
            onValueChange={handlePickerValueChange}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="LevelOne" value="LevelOne" />
            <Picker.Item label="LevelTwo" value="LevelTwo" />
            <Picker.Item label="LevelThree" value="LevelThree" />
          </Picker>
        </View>
        <Button title="Register User" onPress={handleRegisterUser} />
        {users.length > 0 && (
          <View style={styles.navigateContainer}>
            <Button
              title="Go to User list"
              onPress={() => {
                handleNavigateTo('UserListScreen', currentAdmin, users);
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  pickerContainer: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
  },
  pickerItem: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  navigateContainer: {flex: 1, justifyContent: 'center'},
});
