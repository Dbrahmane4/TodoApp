import conf from '../conf/conf';
import axios from 'axios';

export class TodoService{

    async createTodo({title, userId, completed}){
       try {
            const todo = await axios.post(conf.api_url+"/todos",
                {                    
                    "title": title,
                    "userId": userId,
                    "completed": completed
                }
            )
            if(todo){
                return this.getTodos(userId);
            }else{
                return todo;
            }
       } catch (error) {
            console.log("Error while creating todo :: error :: ", error);
            throw error;
       }
    }

    async getTodos({userId}){
        try {
            return await axios.get(conf.api_url + "/todos?" + "userId=" + userId,
                {
                headers: {
                    "X-OpenAPIHub-Key": conf.api_key
                }
            })
        } catch (error) {
            console.log("Error while getting todos :: error :: ",error);
            throw error;
        }
    }

    async getAllTodos(){
        try {
            return await axios.get(conf.api_url + "/todos",
                {
                    headers: {
                    "X-OpenAPIHub-Key": conf.api_key
                    }
                }
            )
        } catch (error) {
            console.log("Error while getting all todos :: error :: ",error);
            throw error;
        }
    }

    async updateTodo({title, todoId, userId, completed}){
        try {
            const todo = await axios.patch(conf.api_url + "/todos/" + "{" + todoId + "}",
                {
                    "title": title,
                    "userId": userId,
                    "completed": completed
                },
                {
                    headers: {
                        "X-OpenAPIHub-Key": conf.api_key
                    }
                }
            );
            if(todo)
            {
                return this.getTodos(userId);
            }else{
                return todo
            }
        } catch (error) {
            console.log();
            throw error
        }
    }

    async deleteTodo({todoId, userId}){
        try {
            const res = await axios.delete(conf.api_url + "/todos/" + "{" + todoId + "}",
                {
                    headers: {
                        "X-OpenAPIHub-Key": conf.api_key
                    } 
                }
            )
            if(res)
                {
                    return this.getTodos(userId);
                }else{
                    return res;
                }
        } catch (error) {
            console.log();
            throw error;
        }
    }
}