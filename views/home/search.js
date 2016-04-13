import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
    StatusBar,
    ScrollView,
    TouchableHighlight,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'
import Util from '../common/util.js'

class Search extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    //设置关键字
    setKey(value){
        this.setState({
            account:value
        })
    }

    //触发搜索
    search(value){
        this.getData(ServiceURL.baseUrl + ServiceURL.search,{word:this.state.key});
    }

    //返回
    goBack(){
        this.props.navigator.pop();
    }

    //加载数据
    getData(url,obj){
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let that = this;
        Util.post(url,obj,function(data){
            console.log(data);
            var items = data.results;
            that.setState({
                dataSource:ds.cloneWithRows(items)
            })
        },function(err){
            if(err) {
                console.log(err);
                alert('加载数据出错😔..');
            }
        })
    }

    render(){
        return (
            <View style={{flex:1}}>
                <StatusBar
                  barStyle="default"
                />
                <View style={styles.header}>
                    <Icon name="ios-arrow-left" size={30} style={{color:'#333',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="ios-search" size={23} style={{color:'#333',position:'absolute',left:6,top:3}} onPress={this.goBack.bind(this)}></Icon>
                        <TextInput style={[styles.input,{fontFamily:'HeiTi SC',fontSize:12}]} placeholder="请出入关键字" onChangeText={(text) => this.setState({key:text})} value={this.state.key}/>
                        <TouchableHighlight style={styles.btn} onPress={this.search.bind(this)}>
                            <Text style={[styles.fontbase],{color:'#fff'}}>搜索</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ScrollView style={{flex:1}}>
                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(row) => <LfItem row={row} onPress={this.goDetail.bind(this,row)}/>}
                    />
                </ScrollView>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    header:{
        height:70,
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:Util.pixel * 2,
        borderBottomColor:'#333'
    },
    input:{
        width:200,
        height:30,
        borderColor:'#333',
        borderWidth:Util.pixel * 2,
        borderRadius:4,
        paddingLeft:30,
    },
    basefont:{
        fontFamily:'HeiTi SC',
        color:'#fff',
    },
    btn:{
        width:50,
        height:30,
        backgroundColor:'#333',
        marginLeft:-5,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Search
