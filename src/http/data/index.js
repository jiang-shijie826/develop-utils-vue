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

export const queryBing=()=>{
  return axios({
    url:'/datePicker/queryBing',
    method:'get',
  })
}

export const userLogin=(data)=>{
  return axios({
    url:'/user/login',
    method:'post',
    data
  })
}

export const getCode=(username)=>{
  return axios({
    url:'/mall/rabbitmq/users/code?username='+username,
    method:'get',
    username
  })
}

export const registerUser=(data)=>{
  return axios({
    url:'/user/registerUser',
    method:'post',
    data
  })
}

export default {sqlRequest, queryCarouselPicture, queryNavigationUrl, 
  updateNavigationCount, queryCommon, queryBing, userLogin, getCode,registerUser}