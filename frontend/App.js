import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PartidaListScreen from './src/screens/PartidaListScreen';
import PartidaFormScreen from './src/screens/PartidaFormScreen';
import PartidaDetalhesScreen from './src/screens/PartidaDetalhesScreen';
import JogadorListScreen from './src/screens/JogadorListScreen';
import JogadorFormScreen from './src/screens/JogadorFormScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const PartidasStack = createNativeStackNavigator();
const JogadoresStack = createNativeStackNavigator();

function PartidasStackScreen() {
  return (
      <PartidasStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.secondary },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
      >
        <PartidasStack.Screen
            name="PartidaList"
            component={PartidaListScreen}
            options={{ title: 'Partidas (Scrims)' }}
        />
        <PartidasStack.Screen
            name="PartidaForm"
            component={PartidaFormScreen}
            options={{ title: 'Salvar Partida' }}
        />
        <PartidasStack.Screen
            name="PartidaDetalhes"
            component={PartidaDetalhesScreen}
            options={{ title: 'Detalhes da Partida' }}
        />
      </PartidasStack.Navigator>
  );
}

function JogadoresStackScreen() {
  return (
      <JogadoresStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.secondary },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
      >
        <JogadoresStack.Screen
            name="JogadorList"
            component={JogadorListScreen}
            options={{ title: 'Elenco (Jogadores)' }}
        />
        <JogadoresStack.Screen
            name="JogadorForm"
            component={JogadorFormScreen}
            options={{ title: 'Salvar Jogador' }}
        />
      </JogadoresStack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textSecondary,
            }}
        >
          <Tab.Screen
              name="TabPartidas"
              component={PartidasStackScreen}
              options={{ title: 'Partidas' }}
          />
          <Tab.Screen
              name="TabJogadores"
              component={JogadoresStackScreen}
              options={{ title: 'Jogadores' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}