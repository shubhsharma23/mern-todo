import React, { useEffect, useState } from 'react'

const Student = () => {
    let [users, setUsers] = useState([]);
    let [ID, setID] = useState(null)
    let [name, setName] = useState("name")
    let [brand, setBrand] = useState("brand")
    let [price, setPrice] = useState("price")
    useEffect(() => {
        getList()
    }, [])

    function add() {
        let data = { name, brand, price }
        fetch("http://localhost:5000", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
            })
            getList()
        })
    }

    function getList() {
        fetch("http://localhost:5000").then((res) => {
            res.json().then((data) => {
                // console.log(data);
                setUsers(data);
            })
        })
    }

    function deleteData(id) {
        console.log(`${id} deleted`);
        fetch(`http://localhost:5000/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
            })
            getList()
        })
    }

    function selectdata(id) {
        users.forEach((user) => {
            if (user._id === id) {
                setID(user._id)
                setName(user.name)
                setBrand(user.brand)
                setPrice(user.price)
            }
        })
    }

    function update() {
        let data = { ID, name, brand, price }
        fetch(`http://localhost:5000/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
            })
            getList();
        })
    }

    return (
        <>
            <h1 className='bg-info text-center m-0'>TODO</h1>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <td>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                        </td>
                        <td>
                            <input type="text" name="name" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </td>
                        <td>
                            <input type="text" name="name" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </td>
                        <td>
                           {(ID) ? <button className='btn btn-primary' onClick={() => update()}>UPDATE</button> : null  }
                        </td>
                        <td>
                            <button className='btn btn-primary' onClick={() => add()}>ADD</button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) =>
                        <tr key={i}>
                            <td>{user.name}</td>
                            <td>{user.brand}</td>
                            <td>{user.price}</td>
                            <td><button className='btn btn-secondary' onClick={() => selectdata(user._id)}>Select</button></td>
                            <td><button className='btn btn-danger' onClick={() => deleteData(user._id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Student;