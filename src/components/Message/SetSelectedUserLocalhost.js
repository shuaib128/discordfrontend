export const SetSelectedUser = (User) => {
    localStorage.setItem(
        'SelectedUser', 
        JSON.stringify(User), 
        { secure: true, httpOnly: true }
    );
}