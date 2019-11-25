new Promise((resolve,reject)=>{
  try{
    var moments = []
    // 处理iframe
    function handleItem(item){
      return Promise.resolve(item) 
      .then((res)=>{
        return new Promise((resolve,reject)=>{
          console.log('每个section的值：');
          console.log(res);
          
          let moment = {};
          moment.version = 3
          moment.url = res.has_video?'https://www.ixigua.com/i' +res.item_id : 'https://www.toutiao.com/i'+ res.item_id
          moment.mid = res.item_id
          moment.uid = null
          moment.publishTime = res.behot_time * 1000
          moment.items = [
            {
              type: "NEWS_LINK",
              body: {
                "newsLink": {
                  "url": moment.url,
                  "type": null,
                  "images": null,
                  "video": null,
                  "title": res.title
                }
              }
            }
          ]
          // 纯文本
          if(!res.image_url){
            moment.items[0].body.newsLink.type = 'TEXT'
          }
          // 单视频
          else if(res.has_video){
            moment.items[0].body.newsLink.type = 'SINGLE_VIDEO'
            moment.items[0].body.newsLink.video.cover = 'http:'+res.image_url
            moment.items[0].body.newsLink.video.duration = res.video_duration_str
          }
          // 单图片
          else if(res.single_mode){
            moment.items[0].body.newsLink.type = 'SINGLE_IMAGE'
            moment.items[0].body.newsLink.images = [{}]
            moment.items[0].body.newsLink.images[0].url = 'http:'+res.image_url
          }
          console.log('-----------当前的moment是：----------');
          console.log(moment);
          moments.push(moment); 
          return resolve(moment)
        })
      })
      .then((res)=>{
        console.log('-----执行完毕');
        console.log(res);
      })
    } 
    console.log('start');
    //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        var msg = ajax.responseText;
        console.log(msg);
        var list = JSON.parse(msg).data
        console.log(list);

        let promise = Promise.resolve()
        list.forEach((i)=>{
          console.log(i)
          promise = promise.then(() => {
            return handleItem(i);
          })
        })
        promise.then(()=>{
          console.log('----------全部执行完毕---------');
          console.log(moments);
          resolve(moments)
        })
      }
    }
    let uid = header.media_id
    //2.创建http请求,并设置请求地址
    ajax.open('get',`https://www.toutiao.com/c/user/article/?page_type=1&user_id=${uid}&max_behot_time=0&count=20`);
    //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");

    //3.发送请求(get--null    post--数据)
    var info = null
    ajax.send(JSON.stringify(info));
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
})