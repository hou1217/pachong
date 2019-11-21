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
      // "url": "",
    }
    origin.uid = document.querySelector("#forumname").getAttribute("fid");
    origin.name = document.querySelector("#forumname").innerText;
    origin.desc = document.querySelector("#des_forum").innerText;
    resolve(origin);
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})