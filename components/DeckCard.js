import React, {Component} from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { purple } from "../utils/colors";

const handleDeck = (props) => {
    props.navigator.push("DisplayDeck", {deckId: props.id, deckTitle: props.deck.title})
}
function DeckCard(props) {
    const {deck} = props
    return <TouchableOpacity style={styles.deck} onPress={() => handleDeck(props)}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text>{deck.questions.length} Card(s) </Text>
            </TouchableOpacity>
    
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
export default connect(mapStateToProps)(DeckCard)
