new Promise((resolve,reject)=>{
  try{
    var moments = []
    // 处理iframe
    function handleIframe(itemDom){
      return Promise.resolve(itemDom) 
      .then((res)=>{
        return new Promise((resolve,reject)=>{
          console.log('每个section的值：');
          console.log(res);
          let moment = {};
          moment.mid = res.article_id
          moment.uid = res.author_id
          moment.publishTime = res.create_time *1000
          moment.url = 'https://' +res.domain + '/' + res.article_id
          moment.text={content:''}
          moment.pics=[]
          console.log('-----------当前的moment是：----------');
          console.log(moment);
          // 创建一个iframe
          let iframe = document.createElement('iframe');
          iframe.src = moment.url;
          iframe.id= moment.mid;
          iframe.name = moment.mid;
          let timer = window.setTimeout(()=>{
            document.body.removeChild(iframe);
            return resolve(moment);
          },10000)
          iframe.onload =  function () {  // 加载完成后
            console.log('iframe onload');
            window.clearTimeout(timer);
            var content = frames[iframe.name].document.querySelector('.content_foot .content-container')
            console.log('-----------当前的content是：----------');
            console.log(content);
            var sections = content.querySelectorAll(".section")
            for(let itemDom of sections){
              var textDom = itemDom.querySelector(".text")
              if(textDom){
                var pDoms = textDom.querySelectorAll("p,h3")
                for(let pDom of pDoms){
                  moment.text.content += pDom.innerText
                }
              }
              var imgDom = itemDom.querySelector(".img-box")
              if(imgDom){
                var imgSrc = imgDom.querySelector("img").src
                moment.pics.push(imgSrc)
              }
            }
            moments.push(moment); 
            document.body.removeChild(iframe);
            return resolve(moment);
          };
          document.body.appendChild(iframe);
        })
      })
      .then((res)=>{
        console.log('-----执行完毕');
        console.log(res);
      })
    } 
    console.log('start');
    var category_id = document.querySelector("#category_id").dataset.id
     //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        var msg = ajax.responseText;
        // console.log(msg);  
        var list = JSON.parse(msg).articles;
        console.log(list);
        var promise = Promise.resolve()
        list.forEach((ele)=>{
          promise = promise.then(() => {
            return handleIframe(ele);
          })
        })
        promise.then(()=>{
          console.log('----------全部执行完毕---------');
          console.log(moments);
          resolve(moments)
        })
      }
    }
     
    //2.创建http请求,并设置请求地址
    ajax.open('post','https://www.meipian.cn/default/article.php');
     //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type","application/json; charset=utf-8");
 
    //3.发送请求(get--null    post--数据)
    var info = {"category_id":category_id,"max_id":"0","controller":"category","action":"list"}
     
    ajax.send(JSON.stringify(info));
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
})