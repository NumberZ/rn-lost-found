/*
 * Util模块
 * 主要提供工具方法
 */
import React, {
    PixelRatio,
    ActivityIndicatorIOS
} from 'react-native';

import Dimensions from 'Dimensions'

var Util = {
    /*最小线宽*/
    pixel: 1 / PixelRatio.get(),

    /*屏幕尺寸*/
    size: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },

    /**
     * 将js对象转变为url参数
     * @param {object} obj 要转化的js对象
     * return url参数字符串
     */
    serialize:function(obj){
        var str = [];
        for(var p in obj)
        if(obj.hasOwnProperty(p)){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
         return str.join("&");
    },
    /**
     * 日期格式化
     * @param {Date} date js日期对象
     */
    formatDate:function(date){
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        return  year + '-' + month + '-' + day + ' ' + hour + ':' + min;
    },

    /**
    * 基于fetch的post方法
    * @method post
    * @param {string} url
    * @param {objec} data post的数据
    * @param {function} callback 请求成功回调
    */
    post: function(url, data, successCallback,failCallback){
        var self = this;
        var opts = {
            method:'POST',
            headers:{
             "Content-Type": "application/x-www-form-urlencoded"
            },
            body:self.serialize(data)
        };
        fetch(url,opts)
        .then((response) => response.text())
        .then((responseText) => {
            successCallback(JSON.parse(responseText));
        })
        .catch(function(err){
            failCallback(err);
        });
    },
      /*loading效果*/
    loading: <ActivityIndicatorIOS color="#3E00FF" style={{marginTop:40,marginLeft:Dimensions.get('window').width/2-10}}/>
}
export default Util;
