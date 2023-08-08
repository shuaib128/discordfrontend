import { useDispatch } from "react-redux";
import { getSelectedUser } from "../../redux/Messages/MessagesActions";

export const useGetLatestChatUser = () => {
    const dispatch = useDispatch();

    const getLatestChatUser = () => {
        try {
            dispatch(getSelectedUser(
                JSON.parse(localStorage.getItem("SelectedUser"))
            ));
        } catch (error) {
            // Handle any errors if needed
        }
    };

    return { getLatestChatUser };
};