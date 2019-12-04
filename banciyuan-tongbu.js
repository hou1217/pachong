new Promise((resolve,reject)=>{
  try{
    if(__ssr_data){

      let list = __ssr_data.page.circleFeeds;
      var moments = []
      list.forEach(element => {
        console.log(element.item_detail);
        let detail = element.item_detail
        let moment = {};
        moment.mid = detail.item_id
        moment.uid = detail.uid
        moment.publishTime = detail.ctime *1000
        moment.url = 'https://bcy.net/item/detail/' + detail.item_id
        if(detail.plain){
          moment.text={content:detail.plain}
        }
        moment.pics=detail.image_list.map(ele=>ele.path)
        moments.push(moment)
      });
      
      resolve(moments);
    }
  }catch(e){
      console.error("解析异常, e: ", e);              
      reject(e);
  }
})