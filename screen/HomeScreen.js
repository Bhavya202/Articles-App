import * as React from 'react';
import {Text, View, Stylesheet, TouchableOpacity, Image} from 'react-native';
import { Header, AirbnbRating, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import {axios} from 'axios';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            articleDetails: {}
        }
    }

    componentDidMount(){
        this.getarticle()
    }

    getarticle = () => {
        const url = "http://127.0.0.1:5000/get-article"
        axios 
            .get(url)
            .then(response => {
                let details = response.data.data;
                this.setState({ articleDetails: details }); 
            })
        .catch(error => {console.log(error.message)} )
    }

    likearticles = () => {
        const url = "http://127.0.0.1:5000/liked-article"
        axios
            .post(url)
            .then(response => {
                this.getarticle(); 
            })
        .catch(error => {console.log(error.message)} )
    }

    unlikearticles = () => {
        const url = "http://127.0.0.1:5000/unliked-article"
        axios
            .post(url)
            .then(response => {
                this.getarticle(); 
            })
        .catch(error => {console.log(error.message)} )
    }

    render(){
        const {articleDetails} = this.state;
        if(articleDetails.title){
            const {title} = articleDetails
            return(
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                    <Header
                        centerComponent={{
                            text: "Articles",
                            style: styles.headerTitle
                        }}
                        rightComponent={{ icon: "search", color: "#fff" }}
                        backgroundColor={"#d500f9"}
                        containerStyle={{ flex: 1 }}
                    />
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.subBottomContainer}>
                            <View style={styles.middleBottomContainer}>
                                <View style={{ flex: 0.3 }}>
                                    <AirbnbRating
                                        count={10}
                                        reviews={["", "", "", "", ""]}
                                        defaultRating={rating}
                                        isDisabled={true}
                                        size={RFValue(25)}
                                        starContainerStyle={{ marginTop: -30 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.lowerBottomContainer}>
                                <View style={iconButtonContainer}>
                                    <TouchableOpacity onPress={this.likedarticle}>
                                        <Icon
                                            reverse name={"check"}
                                            type={"entypo"}
                                            size={RFValue(30)}
                                            color={"#76ff03"}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.unlikedarticle}>
                                        <Icon
                                            reverse name={"cross"}
                                            type={"entypo"}
                                            size={RFValue(30)}
                                            color={"#ff1744"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    return null
    }
}

const styles = Stylesheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 0.1
    },
    headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: RFValue(18)
    },
    subContainer: {
        flex: 0.9
    },
    subTopContainer: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    subBottomContainer: {
        flex: 0.6
    },
    upperBottomContainer: {
        flex: 0.2,
        alignItems: "center"
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        textAlign: "center"
    },
    middleBottomContainer: {
        flex: 0.35
    },
    lowerBottomContainer: {
        flex: 0.45
    },
    iconButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonCotainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: RFValue(160),
        height: RFValue(50),
        borderRadius: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginTop: RFValue(15)
    },
    buttonText: {
        fontSize: RFValue(15),
        fontWeight: "bold"
    }
});