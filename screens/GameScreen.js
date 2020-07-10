import React,{useState,useRef,useEffect} from "react";
import {View,Text,StyleSheet, TextInput,Button,Alert, TouchableOpacity, ScrollView,FlatList,Dimensions} from "react-native";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-style";
import {Ionicons} from '@expo/vector-icons';
import {ScreeOrientation} from "expo";


const generateRandomBetween = (min,max,exclude) =>{

    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max-min)) + min ;

    if(rndNum === exclude){

        return generateRandomBetween(min,max,exclude)

    }else{

        return rndNum;

    }

}

const renderListItem = (value,numOfRound) =>{
    return(
        <View key={value} style={styles.listItem}>
         <Text>#{numOfRound}</Text>
         <Text>{value}</Text>
        </View>
    )
}

const GameScreen = props =>{

    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const {userChoice,onGameOver} = props;

    useEffect(()=>{

        const updateLayout = ()=>{

            setDeviceWidth(Dimensions.get('window').width);
            setDeviceHeight(Dimensions.get('window').height);

        }

        Dimensions.addEventListener('change',updateLayout);

        return()=>{

            Dimensions.removeEventListener('change',updateLayout);

        }

    })

    useEffect(()=>{

        if(currentGuess === props.userChoice){

            props.onGameOver(pastGuesses.length);

        }

    },[currentGuess,userChoice,onGameOver])

    const nextGuessHandler = direction =>{

        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){

                Alert.alert('Do not Lie','You know that this is wrong...',[{text : 'Sorry',style :'cancel'}]);

                return;

        }

        if(direction ==='lower'){

            currentHigh.current = currentGuess


        }else{

            currentLow.current = currentGuess+1;

        }

       const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
       setCurrentGuess(nextNumber);
       setPastGuesses(prevGuesses=> [nextNumber,...prevGuesses])
    
    }

    if(deviceHeight < 500){

        return(
            <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent Guess</Text>
           
            <View style={styles.buttons}>
                  <View style={styles.button}><TouchableOpacity style={DefaultStyles.button} onPress={()=>{nextGuessHandler('lower')}}><Ionicons name="md-remove" size={24} color="white"/></TouchableOpacity></View>
                  <View style={styles.number}><Text>{currentGuess}</Text></View>
                  <View style={styles.button}><TouchableOpacity style={DefaultStyles.button} onPress={()=>{nextGuessHandler('greater')}}><Ionicons name="md-add" size={24} color="white"/></TouchableOpacity></View>
                </View>
                <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index)=>(
                        //renderListItem(guess,index+1)
                        renderListItem(guess,pastGuesses.length-index)
                    ))}
                </ScrollView>
               
                </View>
        </View>
        )

    }

    return(
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent Guess</Text>
            <View style={styles.number}><Text>{currentGuess}</Text></View>
            <View style={styles.buttons}>
                  <View style={styles.button}><TouchableOpacity style={DefaultStyles.button} onPress={()=>{nextGuessHandler('lower')}}><Ionicons name="md-remove" size={24} color="white"/></TouchableOpacity></View>
                  <View style={styles.button}><TouchableOpacity style={DefaultStyles.button} onPress={()=>{nextGuessHandler('greater')}}><Ionicons name="md-add" size={24} color="white"/></TouchableOpacity></View>
                </View>
                <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index)=>(
                        //renderListItem(guess,index+1)
                        renderListItem(guess,pastGuesses.length-index)
                    ))}
                </ScrollView>
               
                </View>
        </View>
    )
}

const styles = StyleSheet.create({

    screen :{

        flex :1,
        padding :10,
        alignItems :'center'

    },
    number :{

        borderColor : Colors.secondary,
        height : 50,
        width : 50,
        borderWidth : 3,
        alignItems :'center',
        justifyContent :'center',
        borderRadius : 10


      },
      buttons :{

        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15,
        marginTop : Dimensions.get('window').height > 600 ? 20 : 10

      },
      button :{

        width :100

      },
      listItem : {

        borderColor : '#ccc',
        padding : 15,
        marginVertical :10,
        backgroundColor : 'white',
        borderWidth : 1,
        flexDirection :'row',
        justifyContent : 'space-between',
        width : '60%'

      },
      listContainer : {

        width : Dimensions.get('window').width > 350 ? '100%' : '60%',
        flex :1

      },
      list : {
          alignItems :'center',
          flexGrow :1,
          justifyContent : 'flex-end'
      }


})

export default GameScreen;