import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversation,
  setSelectedConversation,
} from "../redux/conversation";
import useLoading from "../hooks/useLoading";

const ChatPage = () => {
  const [searchText, setSearchText] = useState("");
  const conversations = useSelector(
    (state) => state.conversation.getConversation
  );
  const socket = useSelector((state) => state.socketio.socket);

  const onlineUsers = useSelector((state) => state.socketio.onlineUsers);

  const selectedConversation = useSelector(
    (state) => state.conversation.getSelectedConversation
  );
  const currentUser = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { isLoading, setLoading } = useLoading();

  const [loadingConversations, setLoadingConversations] = useState(true);
  const showToast = useShowToast();

  const getConversations = async () => {
    try {
      const response = await axios.get("/api/messages/conversations");
      dispatch(setConversation(response.data));
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoadingConversations(false);
    }
  };
  const handleConversationSearch = async (e) => {
    e.preventDefault();
    try {
      const searchedUser = await axios.get(`./api/users/profile/${searchText}`);

      const messagingYourself = searchedUser.data._id === currentUser._id;
      if (messagingYourself) {
        showToast("Error", "You cannot message yourself", "error");
        return;
      }
      const conversationAlreadyExists = conversations.find(
        (conversation) =>
          conversation.participants[0]._id === searchedUser.data._id
      );
      if (conversationAlreadyExists) {
        dispatch(
          setSelectedConversation({
            _id: conversationAlreadyExists._id,
            userId: searchedUser.data._id,
            userName: searchedUser.data.userName,
            userProfilePic: searchedUser.data.profilePic,
          })
        );
        return;
      }
      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser.data._id,
            userName: searchedUser.data.userName,
            profilePic: searchedUser.data.profilePic,
          },
        ],
      };
      dispatch(setConversation([...conversations, mockConversation]));
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      dispatch(
        setConversation(
          conversations.map((conversation) => {
            return conversation._id === conversationId
              ? {
                  ...conversation,
                  lastMessage: {
                    ...conversation.lastMessage,
                    seen: true,
                  },
                }
              : conversation;
          })
        )
      );
    });
  }, [socket, setConversation]);

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      p={4}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder="Search for a user"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={handleConversationSearch}
                isLoading={isLoading}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </form>

          {loadingConversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}

          {!loadingConversations &&
            conversations?.map((conversation) => (
              <Conversation
                key={conversation._id}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
        )}

        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
