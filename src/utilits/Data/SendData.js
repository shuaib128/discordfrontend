import { BackendLink } from "../BackendLink";
import { GetToken } from "../Token/GetToken";

export default function SendData(URL, DATA) {
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
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(DATA)
        };

        return fetch(`${BackendLink}${URL}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.log('error', error));
    } else {
        return Promise.reject(new Error('Access token is empty'));
    }
}