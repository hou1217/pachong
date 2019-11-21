var moment = {};
moment.mid = '205ue0xu'
moment.uid = '10500179'
moment.publishTime = 1523874419 *1000
moment.url = 'https://www.meipian.cn/205ue0xu'
moment.text={content:''}
moment.pics=[]
// 创建一个iframe
var iframe = document.createElement('iframe');
iframe.src = 'https://www.meipian.cn/205ue0xu';
iframe.id= '205ue0xu';
iframe.name = '205ue0xu';
// iframe.width= 1;
// iframe.height= 1;
iframe.onload = function () {  // 加载完成后
  var content = frames[iframe.name].document.querySelector('.content_foot .content-container')
  console.log('iframe onload');
  console.log(content);
  var sections = content.querySelectorAll(".section")
  for(var itemDom of sections){
    var textDom = itemDom.querySelector(".text")
    if(textDom){
      var pDoms = textDom.querySelectorAll("p")
      for(var pDom of pDoms){
        moment.text.content += pDom.innerText
      }
    }
    var imgDom = itemDom.querySelector(".img-box")
    if(imgDom){
      var imgSrc = imgDom.querySelector("img").src
      moment.pics.push(imgSrc)
    }
  }

  document.body.removeChild(iframe);
};
document.body.appendChild(iframe);
console.log(moment); 