import axios from "../axios";
 
export const sqlRequest=(data)=>{
  return axios({
    url:'/sql/replace',
    method:'post',
    data
  })
}

export const queryCarouselPicture=(count)=>{
  return axios({
    url:'/carousel/queryPicture/' + count,
    method:'get',
    count
  })
}

export const queryNavigationUrl=()=>{
  return axios({
    url:'/navigation/queryAll',
    method:'get'
  })
}

export const querySearchNavigation=(count)=>{
  return axios({
    url:'/search/query/' + count,
    method:'get',
    count
  })
}

export const updateNavigationCount=(data)=>{
  return axios({
    url:'/navigation/updateCount',
    method:'post',
    data
  })
}

export const queryCommon=(count)=>{
  return axios({
    url:'/navigation/queryCommon',
    method:'get',
  })
}

export default {sqlRequest, queryCarouselPicture, queryNavigationUrl, updateNavigationCount, queryCommon}