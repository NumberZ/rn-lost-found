/**
 * 设置密码页面
 */
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

class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            oldPassword:'',
            newPassword:'',
        }
    }

    //输入旧密码
    setOld(value){
        this.setState({
            oldPassword:value
        })
    }

    //输入新密码
    setNew(value){
        this.setState({
            newPassword:value
        })
    }

    //返回
    goBack(){
        this.props.navigator.pop();
    }

    //修改密码
    set(){
        let that = this;
        Util.post(ServiceURL.baseUrl + ServiceURL.changePasswordUrl,{
            id:this.props.userId,
            oldPassword:this.state.oldPassword,
            newPassword:this.state.newPassword
        },function(res){
            if(res.Status === true){
                that.props.navigator.pop();
            }else {
                alert('修改失败');
            }
        },function(err){
            alert(err);
        });
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,color:'#fff'}}>
                        设置新密码
                    </Text>
                    <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                </View>
                    <View style={styles.form}>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC'}}>
                            旧密码：
                        </Text>
                        <TextInput style={styles.input} password={true} onChangeText={this.setOld.bind(this)} value={this.state.oldPassword}/>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC',marginTop:5}}>
                            新密码：
                        </Text>
                        <TextInput style={styles.input} password={true} onChangeText={this.setNew.bind(this)} value={this.state.newPassword}/>
                     <TouchableOpacity style={[styles.btn,{marginTop:30,marginBottom:50}]} activeOpacity={0.7} onPress={this.set.bind(this)}>
                             <Text style={{fontFamily:"HeiTi SC",fontSize:16,color:'#fff'}}>
                                 确定
                             </Text>
                     </TouchableOpacity>
                    </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    input:{
        flex:1,
        borderColor:'#000',
        borderWidth:Util.pixel * 1,
        borderRadius:5,
        height:35,
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

export default Setting
