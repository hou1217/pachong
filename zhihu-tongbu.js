new Promise((resolve,reject)=>{
  try{
    console.log('start');
    let moments = []  
    let initialData  = document.querySelector("#js-initialData").innerText
    console.log(JSON.parse(initialData))

    let answers = JSON.parse(initialData).initialState.entities.answers
    let articles = JSON.parse(initialData).initialState.entities.articles
    console.log(answers);
    console.log(articles);

    // 遍历回答
    Object.values(answers).forEach(answer => {
      
    // });
    // for(let answer of answers){
      let moment = {}
      moment.version = 2
      moment.mid = String(answer.id)
      moment.uid = answer.author.id
      moment.publishTime = answer.createdTime*1000
      moment.items = [
        {
          type: "TEXT",
          body: {
            "text": {
              content: answer.question.title
            }
          }
        }
      ]
      // 取出内容
      let content = document.createElement("div");
      content.innerHTML = answer.content
      // 遍历内容
      for(let dom of content.querySelectorAll("p,img,h1,h2,h3,h4,h5")){
        console.log(dom);
        // 判断是图片还是文本
        if(dom.dataset.actualsrc){
          moment.items.push(
            {
              type: "IMAGE",
              body: {
                "image": {
                  "imageUrl": dom.dataset.actualsrc
                }
              }
            }
          )
        }else if(dom.textContent){

          moment.items.push(
            {
              type: "TEXT",
              body: {
                "text": {
                  content: dom.textContent
                }
              }
            }
          )
        }
        

      }

      moments.push(moment); 
    })
    // 遍历文章
    // for(let article of articles){
    Object.values(articles).forEach(article => {
      let moment = {}
      moment.version = 2
      moment.mid = String(article.id)
      moment.uid = article.author.id
      moment.publishTime = article.created*1000
      moment.items = [
        {
          type: "TEXT",
          body: {
            "text": {
              content:article.title
            }
          }
        }
      ]
      // 取出内容
      let content = document.createElement("div");
      content.innerHTML = article.content
      // 遍历内容
      for(let dom of content.querySelectorAll("p,img,h1,h2,h3,h4,h5")){
        console.log(dom);
        // 判断是图片还是文本
        if(dom.src){
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
        }else if(dom.textContent){

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
      moments.push(moment); 
    })
    console.log(moments);
    resolve(moments)
    
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
})