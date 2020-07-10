import React, {Component} from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { gray, purple } from "../utils/colors";


class DeckItem extends Component{

    handleDeck = () => {
        this.props.navigator.push("DisplayDeck", {deckId:this.props.id, deckTitle:this.props.deck.title})
    }
    render(){
        const { deck } = this.props
        return <TouchableOpacity style={styles.deck} onPress={this.handleDeck}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text>{deck.questions.length} Card(s) </Text>
                </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 25,
    },
    deck: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 2,
        borderColor: purple
    }
})

function mapStateToProps(decks, { id }){
    return {
        deck: decks[id]
    }
}
export default connect(mapStateToProps)(DeckItem)
