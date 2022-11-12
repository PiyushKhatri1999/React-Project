import {SET_USER_LIST, ADD_USER, EDIT_USER, DELETE_USER} from "../constants/constants";
export const userData = (data = [], action) => {
    switch (action.type) {
        case SET_USER_LIST:
            data = action.data;
            return data;

        case EDIT_USER:
            for (let i = 0; i < data.length; ++i) {
                
                if (data[i].id === action.editData.id) {
                    data[i] = action.editData;
                    break;
                }
            }
            return data;
        case DELETE_USER:

            for (let i = 0; i < data.length; ++i) {
                if (data[i] !== undefined) {
                    if (data[i].id === action.deleteData.id) {
                        data.splice(i, 1);
                        break;
                    }
                }   
            }
            return data;
        case ADD_USER:
            data.push(action.addData);
            return data;
        default:
            return data
    }
}