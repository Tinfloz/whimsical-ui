export const getConfig = ():{
    headers:{
        Authorization:string
    }
} => {
    const token = JSON.parse(localStorage.getItem("user")!).token
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}