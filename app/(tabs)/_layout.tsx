import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'


const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" color={color} size={24} />
          ),
          tabBarLabelStyle: { fontFamily: 'montserrat-semibold' }
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={24} />
          ),
          tabBarLabelStyle: { fontFamily: 'montserrat-semibold' }
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={24} />
          ),
          tabBarLabelStyle: { fontFamily: 'montserrat-semibold' }
        }}
      />
    </Tabs>
  )
}

export default TabLayout
