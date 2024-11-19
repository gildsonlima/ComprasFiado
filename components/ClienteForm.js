import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import 'react-native-get-random-values'; // Importar a configuração
import { v4 as uuidv4 } from 'uuid';

export default function ClienteForm({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const adicionarCliente = async () => {
    try {
      const cliente = { id: uuidv4(), nome, telefone, endereco };
      const clientes = JSON.parse(await AsyncStorage.getItem('clientes')) || [];
      clientes.push(cliente);
      await AsyncStorage.setItem('clientes', JSON.stringify(clientes));
      Alert.alert('Sucesso', 'Cliente adicionado com sucesso!');
      navigation.navigate('Clientes');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        mode="outlined"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '(99)9999-99999'
        }}
        value={telefone}
        onChangeText={setTelefone}
        customTextInput={TextInput}
        customTextInputProps={{
          label: 'Telefone',
          mode: 'outlined',
          style: styles.input,
          keyboardType: 'phone-pad',
        }}
      />
      <TextInput
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={adicionarCliente} style={styles.button}>
        Adicionar Cliente
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});