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
    origin.name = document.querySelector(".itagname").innerText
    origin.uid = origin.name
    origin.desc = document.querySelector("[name='description']").getAttribute("content")
    
    resolve(origin);
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})