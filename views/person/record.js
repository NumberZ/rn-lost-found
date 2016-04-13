/**
 * home组件
 * @author Linhao Li <linhaoweb@gmail.com>
 */
import React, {
  ActionSheetIOS,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  ScrollView
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'

import LfItem from '../home/lfitem.js'
import ItemDetail from '../home/item_detail.js'

class Record extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isEmpty:false
        }
    }

    componentDidMount(){
        let that = this;
        this.getData(ServiceURL.baseUrl + ServiceURL.recordUrl,{
            id:that.props.userId
        });
    }

    //进入失物详情
    goDetail(row){
        let that = this;
        this.props.navigator.push({
            title:'物品详情',
            component:ItemDetail,
            params:{
                row:row,
                userId:that.props.userId,
                freshRecord:function(){
                    that.getData(ServiceURL.baseUrl + ServiceURL.recordUrl,{
                        id:that.props.userId
                    });
                }
            }
        })
    }

    //返回
    goBack(){
        this.props.navigator.pop();
    }
    //加载首页数据
    getData(url,obj){
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let that = this;
        Util.post(url,obj,function(data){
            let items = data;
            if(items.length == 0){
                that.setState({
                    dataSource:ds.cloneWithRows(items),
                    isEmpty:true
                });
            }else{
                that.setState({
                    dataSource:ds.cloneWithRows(items)
                });
            }


        },function(err){
            if(err) alert('加载数据出错😔..');
        })
    }

    render(){
        return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Text style={{fontFamily:'HeiTi SC',fontSize:20,color:'#fff'}}>
                    发布历史
                </Text>
                <Icon name="ios-arrow-left" size={30} style={{color:'#fff',position:'absolute',left:20,top:30}} onPress={this.goBack.bind(this)}></Icon>
            </View>
            {
                (this.state.isEmpty) ?
                <Text>
                    无记录。
                </Text>
                :
                <ScrollView style={styles.flex_1}>
                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(row) => <LfItem row={row} onPress={this.goDetail.bind(this,row)}/>}
                    />
                </ScrollView>

            }

        </View>
        )
    }
}
var styles = StyleSheet.create({
    flex_1:{
      flex:1,
    },
    header:{
        height:70,
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#333'
    },
    seg:{
        width:200,
        height:30,
        backgroundColor:'#333',
    }
});

export default Record;
