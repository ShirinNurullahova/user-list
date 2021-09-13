import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getAllUsers, showUserDataInfoPanel, clearSelectedUser, editUser } from '../actions';
import Loading from './Loading';

const UserInfoPanel = () => {
    const dispatch = useDispatch();
    const addedUser = useSelector(state => state.addedUser);
    const userInfoPanelVisibility = useSelector(store => store.showUserDataInfoPanel);
    const selectedUser = useSelector(store => store.selectedUser);
    const editedUser = useSelector(store => store.editedUser);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [mail, setMail] = useState("");
    const [gender, setGender] = useState("M");
    const [imgUrl, setImgUrl] = useState("");

    const isAddButtonActive = () => (
        Boolean(name) && Boolean(surname) && Boolean(age) && Boolean(mail) && Boolean(imgUrl)
    )

    const resetForm = () => {
        setName(""); setSurname(""); setAge(""); setMail(""); setGender("M"); setImgUrl("");
    }

    const isEditButtonDisabled = () => (
        selectedUser.data.name === name && selectedUser.data.surname === surname
        && selectedUser.data.age === age && selectedUser.data.mail === mail
        && selectedUser.data.gender === gender && selectedUser.data.imgUrl === imgUrl
    )

    useEffect(() => {
        if(addedUser.status === "success" || editedUser.status === "success") {
            resetForm();
            dispatch(getAllUsers());
        }
    }, [addedUser, editedUser, dispatch])

    useEffect(() => {
        if(editedUser.status === "success") {
            dispatch(showUserDataInfoPanel(false));
        }
    }, [editedUser, dispatch])

    useEffect(() => {
        if(!userInfoPanelVisibility) {
            resetForm();
            dispatch(clearSelectedUser())
        }
    }, [userInfoPanelVisibility, dispatch])

    useEffect(() => {
        if(selectedUser?.actionType === "edit") {
            dispatch(showUserDataInfoPanel(true))
            setName(selectedUser.data.name);
            setSurname(selectedUser.data.surname);
            setAge(selectedUser.data.age);
            setGender(selectedUser.data.gender);
            setMail(selectedUser.data.mail);
            setImgUrl(selectedUser.data.imgUrl);
        }
    }, [selectedUser, dispatch])

    console.log("EDITED", editedUser);
    return (
        userInfoPanelVisibility ? (
            <div className="infopanel-wrapper">
                <div className="user-data">
                    <h1>User data</h1>
                    {(addedUser.status === "pending" || editedUser.status === "pending") ? <Loading /> : (
                        <form className="form">
                            <div>
                                <label htmlFor="name">Student's name: </label><br />
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="surname">Student's surname: </label><br />
                                <input type="text" id="surname" value={surname} onChange={e => setSurname(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="age">Student's age: </label><br />
                                <input type="text" id="age" value={age} onChange={e => setAge(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="mail">Contact email: </label><br />
                                <input type="text" id="mail" value={mail} onChange={e => setMail(e.target.value)} />
                            </div>
                            <div>
                                <p>Gender: </p>
                                <label htmlFor="gender-m">Male</label>
                                <input type="radio" name="gender" id="gender-m" defaultChecked value={gender} onChange={() => setGender("M")} />
                                <label htmlFor="gender-f">Female</label>
                                <input type="radio" name="gender" id="gender-f" value={gender} onChange={() => setGender("F")} />
                            </div>
                            <div>
                                <label htmlFor="url">Image Url: </label><br />
                                <input type="text" id="url" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                            </div>
                            <div>
                                {selectedUser?.actionType === "edit" ? (
                                    <button
                                        className="edit-btn"
                                        disabled={isEditButtonDisabled()}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const userData = {
                                                name,
                                                surname,
                                                age,
                                                mail,
                                                gender,
                                                imgUrl,
                                                id: selectedUser.data.id
                                            }
                                            dispatch(editUser(userData));
                                        }}
                                    >EDIT USER DATA</button>
                                ) : (
                                    <button
                                        className="add-btn"
                                        disabled={!isAddButtonActive()}
                                        onClick={(e) => {
                                        e.preventDefault();
                                        const userData = {
                                            name,
                                            surname,
                                            age,
                                            mail,
                                            gender,
                                            imgUrl
                                        }
                                        dispatch(addUser(userData));
                                    }}>ADD USER</button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        ) : null
    )
}

export default UserInfoPanel;