import React, { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        if (username && password && username.length > 3 && password.length > 6) {
            console.log(username, password)

            fetch('http://localhost:5000/api/account/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log('success')
                        console.log(json)
                        setUsername('')
                        setPassword('')
                    } else {
                        console.log('failure')
                        
                    }
                })
        }
    }

    console.log('hey')

    return (
        <div>
            username
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <br />
            <br />
            <br />
            password
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <br />
            <button onClick={() => submit()} >sign up</button>
        </div>
    )
}

export default SignUp