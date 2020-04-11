import React from 'react'

function UtilContainer(props) {

    const onBtnClick = (event) => {
        console.log("Submit action triggerred");

        // TODO: Validate inputs and payload

        // Generate request object
        const params = {
            baseUrl : document.getElementById("baseUrl").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        const request = getRequest(params);

        // Make  API call to get list of users 
        fetch(request)
            .then(response => {
                if (response.ok) {
                    return response.json;
                } else {
                    throw new Error('Bad HTTP Request');
                }
            })
            .then((jsonData) => {
                console.log(jsonData);
            });
    }

    const getRequest = (params) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + window.btoa(params.username+':'+params.password));

        const req = new Request(params.baseUrl, {
            method: 'GET',
            headers: headers,
            credentials: "same-origin"
        });

        return req;
    }

    return (
        <div className="container">
            <div>Base URL</div>
            <input id="baseUrl" placeholder="Enter base url of application" />

            <div>Username</div>
            <input id="username" placeholder="Enter application username" />

            <div>Password</div>
            <input type="password" id="password" />

            <div>Payload</div>
            <input type="text" id="payload" placeholder="Enter username|password to update e.g. Test.User|pass@20" />

            <div>
                <button name="submit" onClick={onBtnClick}>Submit</button>
            </div>

        </div>
    );
}

export default UtilContainer;