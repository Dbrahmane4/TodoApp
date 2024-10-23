import conf  from '../conf/conf';
import axios from 'axios';

export class AuthService{

    // async signup(){

    // }

    async login(username, email){
        try {
            return await axios.get(conf.api_url+"?username="+ username + "&" + "email" + email, {
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