new Promise((resolve,reject)=>{
  try{
    var origin ={
      "uid": "",
      "name": "",
      "fans": 0,
      "headId": "",
      "bgId": "",
      "desc": "",
      "tagId": "",
      "url": "",
    }
    origin.uid = document.querySelector("[itemprop='url']").getAttribute("content").split("/").slice(-1)[0]
    origin.desc = document.querySelector("[itemprop='description']").getAttribute("content");
    origin.name = document.querySelector("[itemprop='name']").getAttribute("content")
    origin.headId = document.querySelector("[itemprop='image']").getAttribute("content")
    origin.url = document.querySelector("[itemprop='url']").getAttribute("content")
    
    resolve(origin);
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})