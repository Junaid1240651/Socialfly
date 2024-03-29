import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/conversation";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const currentUser = useSelector((state) => state.user.userInfo);
  const selectedConversation = useSelector(
    (state) => state.conversation.getSelectedConversation
  );
  const dispatch = useDispatch();
  const colorMode = useColorMode();

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() =>
        dispatch(
          setSelectedConversation({
            _id: conversation._id,
            userId: user._id,
            userProfilePic: user.profilePic,
            userName: user.userName,
            mock: conversation.mock,
          })
        )
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
        >
          {isOnline ? <AvatarBadge boxSize="1em" bg="green.500" /> : ""}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user.userName} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Flex alignItems={"center"} fontSize={"xs"} gap={1}>
          {currentUser._id === lastMessage.sender && (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          )}
          <Text>
            {lastMessage.text.length > 18
              ? lastMessage.text.substring(0, 18) + "..."
              : lastMessage.text || <BsFillImageFill size={16} />}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Conversation;
