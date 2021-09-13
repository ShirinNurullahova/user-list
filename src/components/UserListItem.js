import React from 'react';
import faker from 'faker';
import deleteIcon from '../images/delete.svg';
import editIcon from '../images/pencil.svg';
import { useDispatch } from 'react-redux';
import { selectUser } from '../actions';
import { animateScroll as scroll } from 'react-scroll';

const UserLIstItem = ({user}) => {
    const dispatch = useDispatch();
    return (
        <tbody>
            <tr>
                <td>
                    <div className="initials">
                        <img src={`${faker.image.avatar()}`} alt="avatar" className="avatar" />
                        <div>
                            {user.name  + " " + user.surname}
                        </div>
                    </div>
                </td>
                <td>{user.age}</td>
                <td>{user.gender === "M" ? "Male" : "Female"}</td>
                <td>{user.mail}</td>
                <td>{user.id}</td>
                <td style={{textAlign: "right"}}>
                    <div className="icons">
                        <img src={deleteIcon} alt="delete" onClick={() => {
                            dispatch(selectUser(user, "delete"));
                            scroll.scrollToTop({duration: "300"});
                        }} />
                        <img src={editIcon} alt="edit" onClick={() => {
                            dispatch(selectUser(user, "edit"));
                            scroll.scrollToBottom({duration: "300"});
                        }} />
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default UserLIstItem;