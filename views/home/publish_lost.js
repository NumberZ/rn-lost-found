import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TextInput,
    ScrollView,
    DatePickerIOS
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'

class PublishLost extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            type:'Lost',
            time:new Date(),
            phone:'',
            description:'',
            place:''
        }
    }

    setName(value){
        this.setState({
            name:value
        })
    }

    setPhone(value){
        this.setState({
            phone:value
        })
    }

    setPlace(value){
        this.setState({
            place:value
        })
    }

    setDescription(value){
        this.setState({
            description:value
        })
    }
    //返回
    goBack(){
        this.props.navigator.pop();
    }

    publish(){
        alert('发布');
    }

    onDateChange(time){
        alert(Util.formatDate(time));
        this.setState({
            time:time
        })

    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,color:'#fff'}}>
                        发布失物信息
                    </Text>
                    <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                </View>
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC'}}>
                            物品名称：
                        </Text>
                        <TextInput style={styles.input} onChangeText={this.setName.bind(this)} value={this.state.name}/>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC',marginTop:5}}>
                            联系电话：
                        </Text>
                        <TextInput style={styles.input} onChangeText={this.setPhone.bind(this)} value={this.state.phone}/>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC',marginTop:5}}>
                            丢失地点：
                        </Text>
                        <TextInput style={styles.input} onChangeText={this.setPlace.bind(this)} value={this.state.place}/>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC',marginTop:5}}>
                            物品描述：
                        </Text>
                        <TextInput style={styles.inputDescription}  multiline={true} onChangeText={this.setDescription.bind(this)} value={this.state.description}/>
                        <Text style={{fontSize:16,fontFamily:'HeiTi SC',marginTop:5}}>
                            丢失时间：
                        </Text>
                        <DatePickerIOS
                           date={this.state.time}
                           mode="datetime"
                           onDateChange={this.onDateChange.bind(this)}
                           minuteInterval={1}
                         />
                     <TouchableOpacity style={[styles.btn,{marginBottom:50}]} activeOpacity="0.7" onPress={this.publish.bind(this)}>
                             <Text style={{fontFamily:"HeiTi SC",fontSize:16,color:'#fff'}}>
                                 发布
                             </Text>
                     </TouchableOpacity>
                    </View>
                </ScrollView>
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
    inputDescription:{
        flex:1,
        borderColor:'#000',
        borderWidth:Util.pixel * 1,
        borderRadius:4,
        height:80,
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

export default PublishLost
