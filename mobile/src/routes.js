import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Deliveries from './pages/Dashboard/Deliveries';
import DeliveryDetails from './pages/Dashboard/DeliveryDetails';
import DeliveryProblems from './pages/Dashboard/DeliveryProblems';
import DeliveryProblem from './pages/Dashboard/DeliveryProblem';
import Delivery from './pages/Dashboard/Delivery';
import Profile from './pages/Profile';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Deliveries,
                  DeliveryDetails,
                  DeliveryProblems,
                  DeliveryProblem,
                  Delivery,
                },
                {
                  defaultNavigationOptions: {
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                      elevation: 0,
                      shadowOpacity: 0,
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 14,
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                    },
                    headerTintColor: '#fff',
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={20} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
              style: {
                height: 70,
                padding: 15,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
