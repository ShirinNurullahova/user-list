import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUserDataInfoPanel } from '../actions';
import addUserIcon from '../images/plus.svg';
import { animateScroll as scroll } from 'react-scroll';

const AddUser = () => {
    const dispatch = useDispatch();
    const userInfoPanelVisibility = useSelector(store => store.showUserDataInfoPanel);

    return (
        <div className={`add-user ${userInfoPanelVisibility ? "add-user-closed" : "add-user-open"}`}
            onClick={() => {
                dispatch(showUserDataInfoPanel(!userInfoPanelVisibility));
                scroll.scrollToBottom({duration: "500"})
            }}
        >
            <img src={addUserIcon} alt="add" />
        </div>
    )
}
export default AddUser;