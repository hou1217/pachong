new Promise((resolve,reject)=>{
  try{
      console.info("方法注入");
      function fillUrl(url){
          if(url && url.indexOf("//") == 0){
              url = 'https:' + url;
          }
          return url;
      }

      //解析
      function parseText(momentDom){
        var feed_content = momentDom.querySelector("[node-type='feed_list_content']").innerText;
        feed_content && (feed_content = feed_content.replace("...展开全文c", ""));
        return {content: feed_content};
      }

      function parseForwardText(momentDom){
        var feed_content = momentDom.querySelector("[node-type='feed_list_reason']").innerText;
        feed_content && (feed_content = feed_content.replace("...展开全文c", ""));
        return {content: feed_content}; 
      }

      function parseVideo(momentDom){
        var video = {};
        var _video = {};
        var fl_h5_video = momentDom.querySelector("[node-type='fl_h5_video']");
        if(fl_h5_video){
          fl_h5_video.getAttribute('action-data').split("&").map(itemStr => {    
            var item = itemStr.split("=");
            _video[item[0]] = item[1];      
          });
          video.width = _video.card_width;  
          video.height = _video.card_height;
          video.src = fillUrl(decodeURIComponent(decodeURIComponent(_video.video_src)));
          video.horizontal = _video.video_orientation === 'horizontal';
          video.cover = fillUrl(decodeURIComponent(decodeURIComponent(_video.cover_img)));      
        }
        
        if(!_video.video_src) return {};//直播流过滤
        return video;
      }

      function parsePics(momentDom){
        var pics = [];
        var fl_pic_list = momentDom.querySelector("[node-type='fl_pic_list']");
        if(fl_pic_list){
            fl_pic_list.getAttribute('action-data').split("&").map(itemStr => {    
              var item = itemStr.split("=");
              if(item[0] === 'clear_picSrc'){
                var picsStr = item[1];
                picsStr.split(",").map((pic) => {
                  pics.push(fillUrl(decodeURIComponent(decodeURIComponent(pic))));
                });          
              }
            });
        }else{
          fl_pic_list = momentDom.querySelector("[node-type='feed_list_media_prev'] ul");
          if(fl_pic_list){
              let actionData = fl_pic_list.getAttribute('action-data');
              if(actionData){
                  actionData.split("&").map(itemStr => {    
                  var item = itemStr.split("=");
                  if(item[0] === 'clear_picSrc'){
                    var picsStr = item[1];
                    picsStr.split(",").map((pic) => {
                      pics.push(fillUrl(decodeURIComponent(decodeURIComponent(pic))));
                    });          
                  }
                });
            };
          }
        }
        return pics;
      }


      var moments = [];
      var _moments = document.querySelectorAll("[node-type='feed_list'] [action-type='feed_list_item']");
      var timer;
      (function doSth(){
        if(!_moments || _moments.length == 0){
          timer = window.setTimeout(()=>{
            _moments = document.querySelectorAll("[node-type='feed_list'] [action-type='feed_list_item']");
            doSth();
          },1000)
        }else{
          window.clearTimeout(timer);
          for(var _moment of _moments){

            var moment = {};

            moment.uid = $CONFIG.oid;
            moment.mid = _moment.getAttribute('mid');
            moment.isforward = _moment.getAttribute('isforward');
            moment.fuid = _moment.getAttribute('tbinfo').substr(_moment.getAttribute('tbinfo').lastIndexOf("=") + 1);
            moment.fmid = _moment.getAttribute('omid');
            moment.furl = 'https://m.weibo.cn/' + moment.fuid + '/' + moment.fmid;
            moment.publishTime = _moment.querySelector("[node-type='feed_list_item_date']").getAttribute('date');
            moment.url = 'https://m.weibo.cn/' + $CONFIG.oid + '/' + moment.mid;
            moment.text = {content: ""};
            moment.video = {};
            moment.pics = [];
            moment.forward = {};
            moment.protocol = 'weibo';

            if(!moment.isforward){
              moment.text = parseText(_moment);
              moment.video = parseVideo(_moment);
              moment.pics = parsePics(_moment);

            }else{
              moment.text = parseText(_moment);
              moment.protocol = 'weibo';
              moment.forward.mid = moment.fmid;
              moment.forward.uid = moment.fuid;
              moment.forward.userSrc = "http://www.weibo.com/u/" + moment.fuid;
              moment.forward.text = parseForwardText(_moment);
              moment.forward.video = parseVideo(_moment);
              moment.forward.pics = parsePics(_moment);
              moment.forward.url = _moment.querySelector("[node-type='feed_list_forwardContent'] [node-type='feed_list_item_date']").href;    
            }

            moments.push(moment); 

          }
          resolve(moments);
        }
      })()
  }catch(err){
    reject(err)
  }
})