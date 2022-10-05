import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './Components/AuthNavigator';


export default function App() {
  return (
    <>
      <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, backgroundColor: "#fff" } }}>
        <AuthNavigator />
      </NavigationContainer>
    </>
  )
}