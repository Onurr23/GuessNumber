import React,{useState, useEffect} from "react";
import {View,Text,StyleSheet, TextInput,Button,TouchableWithoutFeedback,Keyboard,Alert, TouchableOpacity,Dimensions,ScrollView,KeyboardAvoidingView} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import DefaultStyle from "../constants/default-style"


const StartGame = props =>{

  const [enteredValue, setEnteredValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setselectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

  const numberInputHandler = text =>{

    setEnteredValue(text.replace(/[^0-9]/g,''));


  }

  const resetInputHandler = () =>{

    setEnteredValue('')
    setConfirm(false)

  }

  const confirmInputHandler = () =>{

    const chosenNumber = parseInt(enteredValue);

    if(chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99){

      return Alert.alert("Invalid Number","Number has to be a number between 1 and 99", [{text : 'Okay',style : 'destructive', onPress : resetInputHandler}])

    }

    setConfirm(true);
    setselectedNumber(parseInt(enteredValue));
    setEnteredValue('')

  }

  const renderConfirm = () =>{
    return(
        <View style={styles.confirmBox}>
        <Text>You Selected </Text>
        <View style={styles.number}><Text>{selectedNumber}</Text></View>
        <TouchableOpacity activeOpacity={0.8} style={DefaultStyle.button} onPress={()=>props.onStartGame(selectedNumber)}>
          <Text style={{color :'white'}}>Start Game</Text>
        </TouchableOpacity>
      </View>
      
    )

  }

  useEffect(()=>{

    const updateLayout = () =>{

      setButtonWidth(Dimensions.get('window').width/4);
  
    }
  
    Dimensions.addEventListener('change',updateLayout);

    return() =>{

      Dimensions.removeEventListener('change',updateLayout);

    }


  })
    return(
      <ScrollView>
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
         <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
      <View style={styles.screen}>
            <Text style={styles.title}> Start A New Game </Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.text}>Select A Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                <View style={styles.buttons}>
                  <View style={{width : buttonWidth}}><TouchableOpacity onPress={resetInputHandler} style={DefaultStyle.button}><Text style={{color :'white'}}>Reset</Text></TouchableOpacity></View>
                  <View style={{width : buttonWidth}}><TouchableOpacity onPress={confirmInputHandler} style={DefaultStyle.button}><Text style={{color :'white'}}>Confirm</Text></TouchableOpacity></View>
                </View>
            </Card>
        {confirm ? renderConfirm() : null}
        </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </ScrollView>
        
    )

}

const styles = StyleSheet.create({
   
    screen :{

        flex :1,
        padding : 10,
        alignItems : 'center',
       
    
      },
      title :{

        fontSize : 20,
        marginVertical : 10,
        fontFamily :'open-sans-bold'

      },
      inputContainer : {

        width : '80%',
        minWidth : 300, // Responsive
        maxWidth : '95%',
        alignItems : 'center'

      },
      buttons :{

        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15


      },
      // button :{

      //   width :Dimensions.get('window').width/4

      // },
      input : {
        width : 50,
        textAlign : 'center'
      },
      confirmBox : {

        width : '60%',
        height : 170,
        justifyContent : 'space-evenly',
        alignItems : 'center',
        marginTop : 20,
        shadowColor : 'black',
        shadowOffset : {width : 0 , height : 2},
        shadowRadius : 6,
        shadowOpacity : 0.26,
        backgroundColor : 'white',
        elevation : 5,
        shadowRadius : 6,
        borderRadius : 10

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
      text :{

        fontFamily :'open-sans-bold'
        
      }

})

export default StartGame;