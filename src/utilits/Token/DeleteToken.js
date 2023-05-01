export const DeleteToken = () => {
    try {
        /**Delete the asscestoken and the refresh token*/
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        /**Delete selected user*/
        localStorage.removeItem("SelectedUser")
    } catch (error) {

    }
}