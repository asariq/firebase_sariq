
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from "./src/redux/store";
import { Provider } from 'react-redux'
import DashBoard from "./src/pages/dashBoard";
import Register from "./src/pages/register";
import SignIn from "./src/pages/signIn";
import Content from "./src/pages/content";

const Stack = createNativeStackNavigator();

const App = () => {

  return (

<Provider store={store}>
      <NavigationContainer initialroutename={DashBoard} >
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Dashboard" component={DashBoard} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Content" component={Content} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

  )
}

export default App;
