import { TokenType } from "../../../src/app/types/token.types";
import { UserData, UserType } from "../../../src/app/types/loginTypes";

class UserAPI {

  newUser = async (data: UserType): Promise<UserData> => {
    const res = await fetch(`https://digitalmoney.digitalhouse.com/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      console.log('error')
    }
    return res.json();
  }

  getUserData = async(token: string, id: number):Promise<UserType> => {
    const res = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `${token}`
      },
    })
    if(!res.ok){
      console.log('error')
    }
    return res.json()
  }

  updateUserData = async(token: string, id: number, data:object):Promise<UserType> => {
    const res = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `${token}`
      },
      body: JSON.stringify(data)
    })
    if(!res.ok){
      console.log('error')
    }
    return res.json()
  }
}
const userApi = new UserAPI();
export default userApi;