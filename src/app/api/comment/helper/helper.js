export function exposeRequiredData(data){
    return data.map((blog)=>{
        return {
            title: blog.title,
            id: blog._id,
        }
    })
}