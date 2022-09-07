import * as React from "react";
import { StyleSheet, View, Flatlist} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class Recommendation extends React.Component{
    constructor(){
        super();
        this.state={
            data: []
        }
    }

    componentDidMount(){
        this.getData()
    }


    getData = () => {
        const url = "http://127.0.0.1:5000/recommended-articles"
        axios 
            .get(url)
            .then(response => {
                this.setState({ data: response.data.data }); 
            })
        .catch(error => {console.log(error.message)} )
    }

    getExtractor = (item, index) => index.toString()

    renderItem = ({item, index}) => {
        return (
            <Card
                key={`card-${index}`}
                featuredTitle={item.title}
                containerStyle={styles.cardContainer}
                featuredTitleStyle={styles.title}>
            </Card>
        )
    }

    render(){
        const {data} = this.state;

        return(
            <View style={styles.container}>
                <Flatlist 
                    data = {data}
                    keyExtractor = {this.keyExtractor}
                    renderItem = {this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    title: {
        alignSelf: "center",
        fontFamily: "arial",
        fontStyle: "italic",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 20
    },
    cardContainer: {
        flex: 1,
        borderRadius: RFValue(10),
        borderWidth: RFValue(3),
        padding: RFValue(15),
        height: RFValue(110),
        marginBottom: RFValue(20),
        alignSelf: "center",
        justifyContent: "center",
    },
    subtitle: {
        alignSelf: "center",
        fontFamily: "arial",
        fontStyle: "italic",
        fontSize: 16
    }
})