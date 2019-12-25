new Promise((resolve,reject)=>{
  try{
    if(header ){
      var origin ={
        "uid": "",
        "name": "",
        "fans": 0,
        "headId": "",
        "bgId": "",
        "desc": "",
        "tagId": "",
        "url": "",
        "mediaId": null
      }
      origin.uid = header.media_id
      origin.name = header.name
      origin.headId = 'https:'+header.avtar_img
      origin.bgId = 'https:'+header.bg_img
      origin.mediaId = userInfo?userInfo.mediaId:''
      origin.url ='https://www.toutiao.com'+ header.home_url + '#mid=' + origin.mediaId
      // origin.fans = userInfo.page.tagInfo.follow_count
      // origin.desc =  userInfo.page.tagInfo.intro
      
      resolve(origin);
    }
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})