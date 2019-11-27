var b = {
  "data": [
    {
      "items": [
        {
          "type": "",
          "body": {
            "video": {
              "videoUrl": "",
              "duration": "",
              "height": "",
              "width": "",
              "cover": ""
            },
            "image": {
              "imageUrl": "",
              "type": "",
              "height": "",
              "width": ""
            },
            "link": {
              "originUrl": "",
              "imageUrl": "",
              "title": ""
            },
            "text": {
              "content": ""
            },
            "forward": {
              "type": "",
              "body": {},
              "mid": "",
              "userInfo": {
                "uid": "",
                "headId": "",
                "name": ""
              },
              "url": ""
            }
          }
        }
      ],
      "mid": "",
      "uid": "",
      "publishTime": 1,
      "url": "" 
    }
  ],
  "planId": "",
  "taskId": "",
  "rssId": "",
  "category": "",
  "tag": ""
}
new Promise((resolve, reject) => {
  try{
    // 解析视频
    function parseVideo(item){
      var video = {}
      if(item.videos){
        var videoObj = Object.values(item.videos)[0]
        video.src = videoObj.url
      }
      return video
    }
    // 解析图片
    function parsePics(item){
      var pics = []
      if(item.imgs){
        item.imgs.forEach((ele)=>{
          if(ele.video === 0){
            console.log(ele);
            pics.push(ele.urls.origin.urls[0])
          }
        })
      }
      return pics
    }
    console.log('start');
    //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        let msg = ajax.responseText;
        console.log(msg);
        let list = JSON.parse(msg).data.list
        let moments = []
        for(let item of list){
          let moment = {};
          moment.mid = String(item.id)
          moment.uid = item.member.id
          moment.publishTime = item.ct*1000
          if(item.content){
            moment.text = {content:item.content}
          }
          moment.video = parseVideo(item)
          moment.pics = parsePics(item)
          moments.push(moment); 
        }
        console.log(moments);
        resolve(moments);
      }
    }
    
    //2.创建http请求,并设置请求地址
    ajax.open('post','https://share.izuiyou.com/api/topic/details');
    //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type","application/json; charset=utf-8");

    //3.发送请求(get--null    post--数据)
    var info = {
      "h_av": "3.0",
      "h_dt": 9,
      "h_nt": 9,
      "h_ch": "web_app",
      "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
      "tid": ~~location.href.split('/').slice(-1)[0]
    }
    
    ajax.send(JSON.stringify(info));
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
});