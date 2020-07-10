import {StyleSheet} from "react-native";
import Colors from "./colors";

export default StyleSheet.create({

    bodyText :{

        fontFamily : 'open-sans',
        color : 'red'

    },
    title :{

        fontFamily :'open-sans-bold',
        fontSize : 18

    },
    button : {

        backgroundColor : Colors.primary,
        width : 100,
        height : 40,
        justifyContent :'center',
        alignItems :'center',
        borderRadius : 10,
        color :'blue',
        padding : 10

    }

})