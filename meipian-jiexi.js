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
    origin.uid = document.querySelector("#category_id").dataset.id
    origin.name = document.querySelector("#category_id").innerText
    origin.url = document.querySelector("#category_id").href

    resolve(origin);
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})