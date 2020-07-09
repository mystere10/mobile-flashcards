import React,{Component} from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { primaryLight,primaryDark,primaryText, secondary,secondaryText, purple, white } from "../utils/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/common";

class DeckView extends Component{

    static navigationOptions  ({navigation}) {
        return {
             title: navigation.state.params.deckTitle
        }
    }
    toAddCard = (deckId) => {
        this.props.navigation.push("AddCard",{deckId:deckId})
    }
    toStartQuiz = (deckId) => {
        this.props.navigation.push("StartQuiz",{deckId:deckId})
        
        clearLocalNotification()
        .then(setLocalNotification)
    }

    render(){
        const deckId = this.props.navigation.getParam('deckId');
        const deck = this.props.decks[deckId]
        return <View style={styles.container}>
                <View style={[styles.item]}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text>{deck.questions?deck.questions.length:0} Card(s)</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.toAddCard(deckId)}
                >
                    <Text style={{color: white}}> Add Card </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.toStartQuiz(deckId)}
                >
                    <Text style={{color: white}}> Start Quiz </Text>
                </TouchableOpacity>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    row:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:purple,
        borderColor:purple,
        borderRadius: 4,
        borderWidth: 1,
    },
    column:{
        flex:1,
        alignItems:"center",
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
    },
    item: {
        backgroundColor: primaryLight,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
    },
    title:{
        fontSize: 25,
        color:primaryText,
    },
    button:{
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:secondary,
        backgroundColor:'#130f40',
        color:secondaryText,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
    }
  });


function mapStateToProps(decks){  
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckView)
