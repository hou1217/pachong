new Promise((resolve, reject) => {
  try{
    // 解析文本
    function parseText(itemDom){
      console.log(itemDom.querySelector(".mlistcnt .js-content.ptag p"));
      var content = itemDom.querySelector(".mlistcnt .js-content.ptag p");
      if(content){
        return {content: content.innerText};
      }else{
        return null;
      }
     
    }
    // 解析视频
    function parseVideo(itemDom){
      var video = {}
      var videoObj = itemDom.querySelector(".mlistcnt .js-video")
      if(videoObj){
        video.src = videoObj.dataset.videourl
      }
      return video
    }
    // 解析图片
    function parsePics(itemDom){
      var pics = []
      var picObj = itemDom.querySelector(".mlistcnt .img")
      if(picObj){
        var olList = picObj.querySelector(".js-content")
        // 判断有没有图片数组
        if(olList){
          for(var ele of olList.querySelectorAll("li")){
            var imgDom = ele.querySelector(".imgc img")
            pics.push(imgDom.src)
          }
        }else{
          var imgDom = picObj.querySelector(".imgc img")
          console.log(imgDom);
          if(imgDom){
            pics.push(imgDom.src)
          }
        }
      }
      return pics
    }
    console.log('start');
    var moments = []
    var list = document.querySelectorAll("[data-citerootblogid='0']")
    for(var item of list){
      var moment = {};
      moment.mid = item.getAttribute("data-postid")
      moment.uid = item.getAttribute("data-blogid")
      moment.publishTime = item.querySelector(".isayt .isayc").dataset.time
      moment.text = parseText(item)
      moment.video = parseVideo(item)
      moment.pics = parsePics(item)
      // moment.url = null
      moments.push(moment); 
    }
    console.log(moments);
    resolve(moments);

    
   
  }catch(e){
    console.error("解析异常, e: ", e);              
    reject(e);
  }
});