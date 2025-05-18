import React from 'react'
import { View, Text} from 'react-native'

export default function UserProfile({user}) {
  return (
    <View>
        <Text>User Profile</Text>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>  
        <Text>Currently in: {user.currentMode}</Text>  
    </View>
    
  )
}