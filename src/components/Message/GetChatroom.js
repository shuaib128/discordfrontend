export default function GetChatroom(User, SelectedUser) {
    let url = ""
    try {
        const user_id = User.user
        const selectedUser_id = SelectedUser.user

        if (user_id < selectedUser_id) {
            url = User.username + "/" + SelectedUser.username
        } else {
            url = SelectedUser.username + "/" + User.username
        }
    } catch (error) {

    }

    return url
}