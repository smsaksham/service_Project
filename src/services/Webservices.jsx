import axios from "axios"

class WebServices {
    postAPICall(url,data){
        var obj = axios.post(url,data)
        return obj;
    }
    getAPICall(url){
        var obj = axios.get(url);
        return obj;
    }
    deleteAPICall(url,data){
        var obj =axios.delete(url,data)
        return obj;
    }
    changeBusiness(url){
        var obj = axios.put(url)
        return obj;
    }
}

export default new WebServices();