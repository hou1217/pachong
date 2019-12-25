new Promise((resolve,reject)=>{
  try{
    var moments = []
    // 处理true answer
    function formatAnswer(dom,array){
      let index = array.map(ele=>ele.split('：')[0]).indexOf(dom.split('：')[0]);
      console.log('index:'+index);
      return (index+1)
    }
    // 处理iframe
    function handleIframe(itemDom){
      return Promise.resolve(itemDom) 
      .then((res)=>{
        return new Promise((resolve,reject)=>{
          console.log('每个section的值：');
          
          console.log(res);
          
          let moment = {};
          moment.version = 4
          moment.type = res.querySelector(".tiku_green").textContent;
          moment.question = res.querySelector("a").textContent;
          moment.url = res.querySelector("a").href;
          moment.mid = res.querySelector("a").href.split('&').slice(-1)[0].split('=').slice(-1)[0]
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
          },5000)
          iframe.onload =  function () {  // 加载完成后
            console.log('iframe onload');
            window.clearTimeout(timer);
            console.log(frames[iframe.name]);
            let iframeDom = document.getElementById(iframe.id)
            console.log(iframeDom);
            var content = iframeDom.contentWindow.document.querySelector('.main_text1').querySelectorAll('.text1_s_info')[1];
            console.log('-----------当前的content是：----------');
            console.log(content);
            
            let contentDoms = content.querySelectorAll("p");
            let answers = [];
            for(let dom of contentDoms){
              console.log(dom);
              if(dom.textContent){
                if(!dom.querySelector("strong,input")){
                  
                  answers.push(
                    dom.textContent
                  )
                  
                }
                
              }
            }
            moment.answers = answers.slice(1,answers.length-1);
            moment.trueAnswer = formatAnswer(content.querySelector(".tiku_answer").querySelectorAll('p')[1].textContent,moment.answers)
            moment.answers = moment.answers.map(ele=>ele.split('：').slice(-1)[0])
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
    var list = document.querySelector(".content_main").querySelectorAll(".tiku_2")
    let promise = Promise.resolve()
    console.log(list);
    Object.values(list).forEach((i)=>{
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