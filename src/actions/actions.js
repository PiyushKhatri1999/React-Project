
export const userList = () => {
  
    return {
        type: "USER_LIST",
    }
}
export const editSagaUser= (editData) => {
    return {
        type : "EDIT_USER",
        editData
    }
}
export const deleteSagaUser= (deleteData) => {
    return {
        type : "DELETE_USER",
        deleteData
    }
}
export const addUser= (addData) => {
    return {
        type : "ADD_USER",
        addData
    }
}