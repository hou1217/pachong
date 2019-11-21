new Promise((resolve, reject) => {
  try{
      if($CONFIG){
          $CONFIG.name = $CONFIG.onick;
          $CONFIG.uid = $CONFIG.oid;
          //获取头像
          $CONFIG.headId = document.querySelector("[node-type='photo'] img").src;
          //描述
          var desc = document.querySelector("[node-type='cover_wrap'] .pf_intro").getAttribute("title");
          $CONFIG.desc = desc;
          //获取fans
          var tds = document.querySelectorAll("table.tb_counter tbody tr td");
          if(tds[1]){
            var fans = tds[1].querySelector("strong").innerText;
            $CONFIG.fans = fans;
          }
          //获取背景图
          var bgImage = document.querySelector("[node-type='cover_wrap'] [node-type='cover']").style.backgroundImage
          var regex = /url\("(.+)"\)/;
          var found = bgImage.match(regex);
          if(found && found[1]){
              let protocol = location.protocol;
              $CONFIG.bgId = found[1].startsWith("//") ? (protocol + found[1]) : found[1];
          }
          resolve($CONFIG);
      }
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
});