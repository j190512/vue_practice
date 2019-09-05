let storeTools = {}; //存储数据
let store = window.localStorage; //本地存储实例

let temp = JSON.parse(store.getItem('product') || '{}'); //临时数据  从store取出 没有产品则为空
//product ==>store(localStorage)的key
//添加或者更新数据
storeTools.addOrUpdata = function (p) {
  //判断购物车中是否存在  以id为标记
  //存在
  if (temp[p.id]) {
    temp[p.id].forEach(item => {
      item.num += p.num;
    })
  } else {
    temp[p.id] = p.id;
    temp[p.id] = [{
      title: p.title,
      img: p.img,
      price: p.price,
      num: p.num,
    }]
  }
  this.save(temp);
}
//删除商品
storeTools.delete = function (id) {
  delete temp[id];
  // console.log(id)
  this.save(temp);
}
//获取所有商品的总数
storeTools.getTotal = function () {
  let newTemp = JSON.parse(store.getItem('product') || '{}')
  let total = 0;
  for (let id in newTemp) {
    newTemp[id].forEach(item => {
      total += item.num;
    })
  }
  // console.log(total);
  return total;
}
//获取购物车信息
storeTools.getInfo = function () {
  return JSON.parse(store.getItem('product') || '{}');
}
storeTools.save = function (temp) {
  store.setItem('product', JSON.stringify(temp));
}
export default storeTools;
