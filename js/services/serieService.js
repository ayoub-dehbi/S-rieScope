import { api } from "./api.js";

// let params = {
//   "name": "Under the Dome",
//   "language": "English",
//   "genres": [
//     "Drama"
//   ]
// }

// getAll(params)

export async function getAll(filters = {}){
    try {
        const params = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== "" && value != null)
        );
        // console.log(filters);
        // console.log(params);
        const resp = await api.get("/series" , { params })
    // console.log(resp.data);
    return resp.data
    
    } catch (error) {
        console.error(error);
        
    }
}

export async function getById(id) {
    try {
    const resp = await api.get(`/series/${id}`)
        // console.log(resp.data);
    return resp.data

    } catch (error) {
        console.error(error);
        
    }

}
export async function create(serie) {
    try {
    const resp = await api.post(`/series`,serie)
        // console.log(resp.data);
        getAll()
    return resp.data

    } catch (error) {
        console.error(error);
        
    }

}

export async function update( id, serie) {
    try {
    const resp = await api.patch(`/series${id}`,serie)
        // console.log(resp.data);
        getAll()
        return resp.data

    } catch (error) {
        console.error(error);
        
    }

}
export async function remove(id) {
    try {
    const resp = await api.delete(`/series${id}`)
        // console.log(resp.data);
        getAll()
        return resp.data

    } catch (error) {
        console.error(error);
        
    }

}

