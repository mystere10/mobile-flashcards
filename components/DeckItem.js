import React, {Component} from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { primaryLight, primaryText, primaryDark } from "../utils/colors";


class DeckItem extends Component{

    viewDeck = () => {
        this.props.navigator.push("DeckView", {deckId:this.props.id, deckTitle:this.props.deck.title})
    }
    render(){
        const { deck } = this.props

        return <TouchableOpacity style={[styles.item]} onPress={this.viewDeck}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text >{deck.questions.length} Card(s) </Text>
                </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
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
    }
})

function mapStateToProps(decks, { id }){
    return {
        deck:decks[id]
    }
}
export default connect(mapStateToProps)(DeckItem)
