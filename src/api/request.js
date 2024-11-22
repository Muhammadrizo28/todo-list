import axios from "axios";

export async function request(method = 'get', way = '', obj = {}) {

    try {

        const res = await axios[method](`http://localhost:8080/todos${way}`, obj)

        return res.status >= 200 && res.status < 300 ? res.data : console.log('error :', res.status);
    }

    catch (err) {console.log(err)}
    
}