import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableOpacity,
    TextInput
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'
import Center from './center'
import SignUp from './signup'
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            account:'18814116653',
            password:'12'
        }
    }
    //设置账户名
    setAccount(value){
        this.setState({
            account:value
        })
    }
    //设置密码
    setPassword(value){
        this.setState({
            password:value
        })
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
    //登录
    login(){
        let navigator = this.props.navigator;
        let that = this;
        Util.post(ServiceURL.baseUrl + ServiceURL.loginUrl,{
            account:this.state.account,
            password:this.state.password
        },function(res){
            if(res.Status === true){
                if(navigator){
                    navigator.push({
                        name: 'center',
                        component: Center,
                        params:{
                            User:res.User,
                            clean:function(){
                                that.setState({
                                    account:'',
                                    password:''
                                });
                            }
                        },

                    });
                }
            }else{
                alert('账户密码错误！');
            }
        },function(err){
            alert(err);
        });
        //

    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{width:Util.size.width,height:Util.size.height * 0.5}}>
                    <View style={{flex:2}}>
                        <Image style={{width:Util.size.width,height:Util.size.height * 0.5}}  source={require('../images/back.jpeg')}/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:'HeiTi SC',fontSize:35,color:'#fff',fontWeight:'100'}}>
                            －失物招领－
                        </Text>
                    </View>
                    <Icon name="person-add" style={{position:'absolute',right:10,top:20,color:"#fff"}} size={30} onPress={this.goSignUp.bind(this)}></Icon>
                </View>
                <View style={{flex:1,padding:30,justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="person" size={33}></Icon>
                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} clearButtonMode='while-editing' onChangeText={this.setAccount.bind(this)} value={this.state.account}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="ios-locked" size={33}></Icon>
                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} password={true} onChangeText={this.setPassword.bind(this)} value={this.state.password}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={this.login.bind(this)}>
                        <Text style={{fontFamily:'HeiTi SC',fontSize:16,color:'#fff'}}>
                            Login in
                        </Text>
                    </TouchableOpacity>
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
        borderColor:'#333',
    },
    btn:{
        height:50,
        borderRadius:30,
        backgroundColor:'#333',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        marginRight:30,
        marginBottom:20
    }
});

export default Login
