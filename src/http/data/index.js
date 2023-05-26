import axios from "../axios";
 
export const sqlBeauty=(data)=>{
  return axios({
    url:'/sql/replace',
    method:'post',
    data
  })
}

export default {sqlBeauty}