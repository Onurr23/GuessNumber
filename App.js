import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';


const fetchFonts = () =>{

    return Font.loadAsync({

    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')

  })

}

export default function App() {

  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return(
      <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)} onError={(err)=>console.log(err)} />
    )
  }



  const startGameHandler = (selectedNumber) =>{

    setuserNumber(selectedNumber);
    setGuessRounds(0)

  }

  const configureNewGameHandler = () =>{

    setGuessRounds(0);
    setuserNumber(null)

  }
  
  const gameOverHandler = numOfRounds => {

    setGuessRounds(numOfRounds)

  }

  let content = <StartGame onStartGame={startGameHandler} />

  if(userNumber && guessRounds <= 0){

    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />

  }else if(guessRounds > 0){

    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} startGame={configureNewGameHandler} />

  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess A Number"/>
       {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
  screen :{

    flex :1

  }

});
