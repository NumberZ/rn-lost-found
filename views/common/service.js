/**
 * 服务URL
 */
var ServiceURL = {
    baseUrl:'http://172.26.14.31:10688/ssm-framework/',
    indexUrl:'te/information/index', //请求物品信息
    imageUrl:'static/photo/',  //静态图片
    avatorUrl:'static/head/',  //头像
    loginUrl:'te/user/loginpassword', //登录
    publishUrl:'te/information/publish', //发布物品
    recordUrl:'te/information/all',  //历史记录
    searchUrl:'te/information/find',  //搜索
    systemUrl:'te/terrace/system',  //系统消息
    adviceUrl:'te/words/publish',   //建议
    authUrl:'te/user/phoneCode',    //短信验证
    changeNameUrl:'te/user/changename', //修改昵称
    changePasswordUrl:'te/user/changepassword', //修改密码
    changeAvatorUrl:'te/user/changephoto', //修改头像
    deleteUrl:'te/information/delete', //删除物品信息
    updateUrl:'te/terrace/check',  //检查更新
}

export default ServiceURL
