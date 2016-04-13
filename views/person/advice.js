import React,{
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'

class Advice extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:''
        }
    }

    setAdvice(value){
        this.setState({
            messgae:value
        })
    }
    //返回
    goBack(){
        this.props.navigator.pop();
    }

    //发送消息
    sendAdvice(){
        alert('发布');
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,color:'#fff'}}>
                        意见反馈
                    </Text>
                    <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                </View>
                <ScrollView>
                    <View style={styles.form}>
                    <TextInput style={styles.inputDescription}  placeholder="请在这里留言..😊" multiline={true} onChangeText={this.setAdvice.bind(this)} value={this.state.messgae}/>
                     <TouchableOpacity style={[styles.btn,{marginBottom:50,marginTop:20}]} activeOpacity="0.7" onPress={this.sendAdvice.bind(this)}>
                             <Text style={{fontFamily:"HeiTi SC",fontSize:16,color:'#fff'}}>
                                 提交
                             </Text>
                     </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    inputDescription:{
        flex:1,
        borderColor:'#000',
        borderWidth:Util.pixel * 1,
        borderRadius:4,
        height:300,
        marginTop:5,
        paddingLeft:10,
        fontSize:14,
        fontFamily:'HeiTi SC'
    },
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
    },
    btn:{
        height:40,
        backgroundColor:'#333',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    }
});

export default Advice
