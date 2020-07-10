import React,{useState,useEffect} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View,Dimensions,ScrollView } from "react-native";
import Colors from "../constants/colors";
import DefaultStyle from "../constants/default-style";


const GameOverScreen = props =>{

    const [deviceWidth, setdeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setdeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(()=>{

        const updateLayout = () =>{

            setdeviceHeight(Dimensions.get('window').height);
            setdeviceWidth(Dimensions.get('window').width);

        }

        console.log('ANAN')
        Dimensions.addEventListener('change',updateLayout)

        return()=>{

            Dimensions.removeEventListener('change',updateLayout)

        }

    })

    return(
        <ScrollView>
        <View style={styles.screen}>
            <Text style={DefaultStyle.title}>Game is Over</Text>
            <View style={styles.imageContainer}>
            <Image fadeDuration={300} resizeMode="cover" style={styles.image} source={require('../assets/success.png')} />
            </View>
            <Text style={DefaultStyle.bodyText}> Your Phone Needed : <Text style={styles.highlight}>{props.roundsNumber}</Text> Rounds To Guess Number <Text style={styles.highlight}>{props.userNumber}</Text> </Text>
             
             <TouchableOpacity style={DefaultStyle.button} onPress={props.startGame}>
                 <Text style={{color : 'white'}}>Start Game</Text>
                 </TouchableOpacity>
        </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    screen :{

        flex :1,
        justifyContent :'center',
        alignItems :'center'

    },

    imageContainer :{

        width : Dimensions.get('window').width * 0.7,
        height : Dimensions.get('window').width * 0.7,
        borderRadius :Dimensions.get('window').width * 0.7 /2,
        borderWidth : 3,
        borderColor :'black',
        overflow : 'hidden',
        marginVertical : Dimensions.get('window').height / 30

    },
    image:{

        width :'100%',
        height :'100%'

    },
    highlight :{

        color : Colors.primary,
        textAlign :'center',
        fontSize : Dimensions.get('window').height < 400 ? 16 : 20


    }

})

export default GameOverScreen;