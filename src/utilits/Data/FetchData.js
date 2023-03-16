import { BackendLink } from "../BackendLink";
import { GetToken } from "../Token/GetToken";

export default function FetchData(URL) {
    const accessToken = GetToken().accessToken;

    if (accessToken !== "") {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
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