import axios, {AxiosResponse} from 'axios'
import '../config/dotenv'
const TOKEN = process.env.VAULT_TOKEN

export const queryVault = (uri: string) => {

  return new Promise((resolve, reject) => {
    const options = {
      headers:{
        'Authorization': `Bearer ${TOKEN}`
      }
    }
  
    axios.get(`${process.env.VAULT_HOST}${uri}`, options)
    .then((res:AxiosResponse) => resolve(res.data))
    .catch((err: any) => reject(err))
  })
}
