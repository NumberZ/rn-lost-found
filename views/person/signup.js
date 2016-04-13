import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TextInput
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'
class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            authCode:''
        }
    }

    //返回
    goBack(){
        this.props.navigator.pop();
    }

    //设置账户名
    setphone(value){
        this.setState({
            phone:value
        })
    }
    //设置密码
    setAuthCode(value){
        this.setState({
            authCode:value
        })
    }

    //获取验证码
    getAuthCode(){

    }

    //跳转注册
    goSignUp(){
        let navigator = this.props.navigator;
        if(navigator){
            navigator.push({
            name: 'signup',
            component: SignUp,
            });
        }
    }
    login(){

    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{width:Util.size.width,height:Util.size.height * 0.5,backgroundColor:'#fb7e30'}}>
                    <View style={{flex:2}}></View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:'HeiTi SC',fontSize:35,color:'#fff',fontWeight:'100'}}>
                            Lost  &  Found
                        </Text>
                    </View>
                     <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                </View>
                <View style={{flex:1,padding:30,justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="iphone" size={33}></Icon>
                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} clearButtonMode='while-editing' onChangeText={this.setphone.bind(this)} value={this.state.phone}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="ios-unlocked" size={33}></Icon>
                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} authCode={true} onChangeText={this.setAuthCode.bind(this)} value={this.state.authCode}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'space-around',alignItems:'center'}}>
                        <TouchableOpacity style={[styles.btn,{backgroundColor:'#fb7e30'}]} activeOpacity={0.7} onPress={this.getAuthCode.bind(this)}>
                            <Text style={{fontFamily:'HeiTi SC',fontSize:16,color:'#fff'}}>
                                获取验证码
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{backgroundColor:'#31be67'}]} activeOpacity={0.7} onPress={this.login.bind(this)}>
                            <Text style={{fontFamily:'HeiTi SC',fontSize:16,color:'#fff'}}>
                                验证
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        width:200,
        height:30,
        paddingLeft:5
    },
    inputWrapper:{
        marginLeft:20,
        borderBottomWidth:Util.pixel,
        borderColor:'#fb7e30',
    },
    btn:{
        borderRadius:4,
        height:50,
        width:100,
        backgroundColor:'#333',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    }
});

export default SignUp
