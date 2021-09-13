import { combineReducers } from "redux"
import { getPayload } from "../utils"

const listOfUsersReducer = (listOfUsers = {data: null, status: "idle", error: null}, action) => {
    return action.type === "LIST_OF_USERS" ? action.payload : listOfUsers
}

const selectedUserReducer = (selectedUser = null, action) => {
    return action.type === "SELECTED_FOR_ACTION" ? action.payload : selectedUser
}

const deleteUserReducer = (deletedUser = getPayload("idle", null), action) => {
    return action.type === "DELETE_USER" ? action.payload : deletedUser
}

const showUserDataInfoPanelReducer = (visibility = false, action) => {
    return action.type === "USER_DATA_INFO_PANEL" ? action.payload : visibility
}

const addUserReducer = (addUser = getPayload("idle", null), action) => {
    return action.type === "ADD_USER" ? action.payload : addUser
}

const editUserReducer = (editUser = getPayload("idle", null), action) => {
    return action.type === "EDIT_USER" ? action.payload : editUser
}

export default combineReducers({
    listOfUsers: listOfUsersReducer,
    selectedUser: selectedUserReducer,
    deletedUser: deleteUserReducer,
    showUserDataInfoPanel: showUserDataInfoPanelReducer,
    addedUser: addUserReducer,
    editedUser: editUserReducer
})