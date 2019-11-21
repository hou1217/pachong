new Promise((resolve,reject)=>{
  try{
    if(__ssr_data){

    
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
      origin.uid = __ssr_data.page.tagInfo.circle_id
      origin.name = __ssr_data.page.tagInfo.circle_name
      origin.fans = __ssr_data.page.tagInfo.follow_count
      origin.headId = __ssr_data.page.tagInfo.cover.url
      origin.bgId = __ssr_data.page.tagInfo.banner.url
      origin.desc =  __ssr_data.page.tagInfo.intro
      
      resolve(origin);
    }
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})