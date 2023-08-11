import { BackendLink } from "../BackendLink";
import { GetToken } from "../Token/GetToken";

export default function SendData(METHOD, URL, DATA) {
    const accessToken = GetToken().accessToken;

    if (accessToken !== "") {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization", `Bearer ${accessToken}`
        );
        myHeaders.append(
            "Content-Type", "application/json"
        );

        var requestOptions = {
            method: METHOD,
            headers: myHeaders,
            redirect: 'follow',
            body: DATA
        };

        return fetch(`${BackendLink}${URL}`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    window.location.replace('/signin');
                }
                return response.json()
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                
            });
    } else {
        return Promise.reject(new Error('Access token is empty'));
    }
}