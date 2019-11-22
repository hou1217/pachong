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
          moment.version = 2
          moment.url = res.querySelector(".truetit").href
          var mid = res.querySelector(".truetit").href.replace(/[^0-9]/ig,"")
          moment.mid = mid
          moment.uid = res.querySelector(".aulink").href.split('/').slice(-1)[0]
          moment.publishTime = null
          moment.items = [
            {
              type: "TEXT",
              body: {
                "text": {
                  content:res.querySelector(".truetit").textContent
                }
              }
            }
          ]
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
            console.log(frames[iframe.name]);
            let iframeDom = document.getElementById(iframe.id)
            console.log(iframeDom);
            var content = iframeDom.contentWindow.document.querySelector('#tpc .floor-show')
            console.log('-----------当前的content是：----------');
            console.log(content);
            // 时间
            moment.publishTime = new Date(content.querySelector(".stime").textContent).getTime()
            let contentDom = content.querySelector(".quote-content")
            
            for(let dom of contentDom.querySelectorAll("p,img")){
              console.log(dom);
              // 判断是图片还是文本
              if(dom.querySelector("img") || dom.src){
                if(dom.querySelector("img")){
                  moment.items.push(
                    {
                      type: "IMAGE",
                      body: {
                        "image": {
                          "imageUrl": dom.querySelector("img").src 
                        }
                      }
                    }
                  )
                }else if(dom.src){
                  moment.items.push(
                    {
                      type: "IMAGE",
                      body: {
                        "image": {
                          "imageUrl": dom.src
                        }
                      }
                    }
                  )
                }
                
              }else if(dom.textContent){
                if(!dom.querySelector("a")){
                  moment.items.push(
                    {
                      type: "TEXT",
                      body: {
                        "text": {
                          content:dom.textContent
                        }
                      }
                    }
                  )
                }
                
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
    var list = document.querySelector(".for-list").querySelectorAll("li")
    let promise = Promise.resolve()
    console.log(list);
    Object.values(list).slice(1).forEach((i)=>{
      console.log(i)
      promise = promise.then(() => {
        return handleIframe(i);
      })
    })
    promise.then(()=>{
      console.log('----------全部执行完毕---------');
      console.log(moments);
      resolve(moments)
    })
      
    
 
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
})