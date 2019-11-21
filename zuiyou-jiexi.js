var a = {
  "uid": "",
  "name": "",
  "url": "",
  "headId": "",
  "bgId": "",
  "desc": "",
  "tagId": "",
  "fans": 1,

  "planId": "",
  "notSync": false,
}
new Promise((resolve, reject) => {
  try{
    console.log('start');
    //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        var msg = ajax.responseText;
        console.log(msg);
        var res = JSON.parse(msg).data
        var origin ={
          "uid": "",
          "name": "",
          "fans": 0,
          "headId": "",
          "bgId": "",
          "desc": "",
          "tagId": "",
          // "url": "",
        }
        origin.uid = res.share_url.split("?")[0].split("/").slice(-1)[0]
        origin.name = res.title.split("：")[1]
        origin.fans = res.desc.replace(/[^0-9]/ig,"")
        origin.headId = res.icon
        // origin.url = res.share_url

        console.log(origin);
        resolve(origin);
      }
    }
    
    //2.创建http请求,并设置请求地址
    ajax.open('post','https://share.izuiyou.com/api/share/content');
    //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type","application/json; charset=utf-8");

    //3.发送请求(get--null    post--数据)
    var info = {
      "h_av": "3.0",
      "h_dt": 1,
      "h_nt": 9,
      "h_ch": "web_app",
      "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
      "stype": "wechat",
      "h_app": "zuiyou",
      "type": "topic",
      "tid": ~~location.href.split('/').slice(-1)[0]
    }
    
    ajax.send(JSON.stringify(info));
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
});