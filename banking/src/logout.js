import React from 'react';
import { useContext } from 'react';
import { store } from './App';
import Card from './context';
import { useNavigate } from 'react-router-dom';

function LogOut () {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const handle = () => {
        setToken("");
        navigate("/login");
    }

    return (

        <Card
            bgcolor="warning"
            header="LogOut"
            body={
                <>
                    <button type="submit" 
                        className="btn btn-light" 
                        onClick={handle}>
                            Logout
                        </button>
                </>
            }
        />
    )
}

export default LogOut;

