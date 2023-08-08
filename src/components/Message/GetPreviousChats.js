import { useDispatch } from "react-redux";
import GetChatroom from "./GetChatroom";
import SendData from "../../utilits/Data/SendData";
import { resetMessages } from "../../redux/Messages/MessagesActions";
import { getMessages } from "../../redux/Messages/MessagesActions";

export const useGetPreviousChats = () => {
    const dispatch = useDispatch();

    const getPreviousChats = (
        setLoading,
        User,
        SelectedUser
    ) => {
        try {
            setLoading(true)
            const chatRoom = GetChatroom(User, SelectedUser)
            SendData(
                "POST",
                "/api/chat/chatroom/",
                {
                    chatRoom: chatRoom,
                    user: User.username,
                    selectedUser: SelectedUser.username
                }
            ).then((data) => {
                /**
                 * Delete all the messages from the redux messages and
                 * add message from history
                 */
                console.log(data)
                dispatch(resetMessages())
                dispatch(getMessages(data.chatContext))
                setLoading(false)
            })
        } catch (error) {

        }
    };

    return { getPreviousChats };
};