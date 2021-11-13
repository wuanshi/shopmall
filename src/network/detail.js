import { request } from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function  getRecommend() {
  return request({
    url:'/recommend'
  })
}

export class Goods{
  constructor(itemInfo,cloumns,services){
    this.itemInfo = itemInfo;
    this.columns = cloumns;
    this.services = services;
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.score = shopInfo.score;
    this.cGoods = shopInfo.cGoods;
    this.cSells = shopInfo.cSells;
  }
}
