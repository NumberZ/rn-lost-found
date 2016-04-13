import React,{
    Component,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'


class Message extends Component{
    constructor(props){
        super(props);
    }

    //返回
    goBack(){
        this.props.navigator.pop();
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,color:'#fff'}}>
                        系统消息
                    </Text>
                    <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                </View>
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={{fontFamily:'HeiTi SC'}}>
                            这里是系统消息。
                        </Text>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    form:{
        padding:20
    },
    header:{
        height:70,
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#333'
    }
});

export default Message
