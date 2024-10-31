import conf  from '../conf/conf';
import axios from 'axios';

export class AuthService{

    async signup({name, username, email, phone, website}){
        try {
            const userData = await axios.post(conf.api_url+"/users",
            {
                "name": name,
                "username": username,
                "email": email,
                "phone": phone,
                "website": website,
            },
            {
                headers: {
                    "X-OpenAPIHub-Key": conf.api_key
                }
            });
            if(userData){
                return this.login({username,email})
            }else{
                return userData;
            }
            
        } catch (error) {
            console.log("Error while signup :: error :: ", error);
            throw error;
        }
    }

    async login({username, email}){
        try {
            return await axios.get(conf.api_url+"/users"+"?username="+ username + "&" + "email" + email, {
                headers: {
                    "X-OpenAPIHub-Key": conf.api_key
                }
            });
        } catch (error) {
            console.log("Error while login :: error :: ", error);
            throw error
        }
    }
}

const authService =  new AuthService();
export default authService;