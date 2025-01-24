// UserListScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Admin from '../../models/Admin';
import {Picker} from '@react-native-picker/picker';

const UserListScreen = ({route, navigation}) => {
  const {admin, users} = route.params;
  const [newUserId, setNewUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [adminLevel, setAdminLevel] = useState('LevelOne');

  const handlePickerValueChange = itemValue => {
    setAdminLevel(itemValue);
  };

  useEffect(() => {
    console.log('From UserList:', admin, users);
  }, [admin, users]);

  const handleAddUser = () => {
    if (!(admin instanceof Admin) || admin.adminLevel !== 'LevelThree') {
      Alert.alert("Only admins with 'levelThree' access can add users.");
      return;
    }
    if (!newUserId || !newUserName || !newUserEmail || !adminLevel) {
      Alert.alert('All fields required!');
      return;
    }
    const checkExistingId = users.find(user => user.id === newUserId);

    if (checkExistingId) {
      Alert.alert('Unique Id required!');
      return;
    }

    const newAdmin = new Admin(
      newUserId,
      newUserName,
      newUserEmail,
      adminLevel,
    );

    const updatedUsers = [...users, newAdmin];
    navigation.setParams({users: updatedUsers});
    setNewUserId('');
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = userId => {
    console.log(
      'condititons',
      admin instanceof Admin,
      admin.adminLevel !== 'LevelThree',
    );
    if (!(admin instanceof Admin) || admin.adminLevel !== 'LevelThree') {
      Alert.alert("Only admins with 'LevelThree' access can delete users.");
      return;
    }
    const updatedUsers = users.filter(user => user.id !== userId);
    navigation.setParams({users: updatedUsers});
  };

  return (
    <View style={styles.container}>
      <View style={styles.userAdmin}>
        <Text>
          {`Current User: `}
          {admin?.name}
          {` (${admin?.email})`}
        </Text>
        <Text>{admin?.adminLevel}</Text>
      </View>
      <Text>User List</Text>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <Text>
              {item?.name} ({item?.email}){item?.adminLevel}
            </Text>
            {admin instanceof Admin && (
              <Button
                title="Delete"
                onPress={() => handleDeleteUser(item?.id)}
              />
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {admin instanceof Admin && (
        <>
          <TextInput
            placeholder="New User ID"
            value={newUserId}
            onChangeText={setNewUserId}
            style={styles.input}
          />
          <TextInput
            placeholder="New User Name"
            value={newUserName}
            onChangeText={setNewUserName}
            style={styles.input}
          />
          <TextInput
            placeholder="New User Email"
            value={newUserEmail}
            onChangeText={setNewUserEmail}
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
          <Button title="Add User" onPress={handleAddUser} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAdmin: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
});

export default UserListScreen;
