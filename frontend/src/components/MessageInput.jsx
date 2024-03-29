import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversation,
  setSelectedConversation,
} from "../redux/conversation";
import usePreviewImage from "../hooks/usePreviewImage";
import useLoading from "../hooks/useLoading";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const imageRef = useRef(null);
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, setLoading } = useLoading();

  const { handleImageChange, imageURL, setImageURL } = usePreviewImage();
  const selectedConversation = useSelector(
    (state) => state.conversation.getSelectedConversation
  );
  const conversations = useSelector(
    (state) => state.conversation.getConversation
  );

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText && !imageURL) return;
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await axios.post("./api/messages", {
        message: messageText,
        recipientId: selectedConversation.userId,
        img: imageURL,
      });
      setMessages((message) => [...message, response.data]);
      dispatch(
        setConversation(
          conversations.map((conversation) =>
            conversation._id === selectedConversation._id
              ? {
                  ...conversation,
                  lastMessage: {
                    text: messageText,
                    sender: response.data.sender,
                  },
                }
              : conversation
          )
        )
      );
      setMessageText("");
      setImageURL("");
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex gap={2} alignItems={"center"}>
      <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
        <InputGroup>
          <Input
            w={"full"}
            placeholder="Type a message"
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
            <IoSendSharp />
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flex={5} cursor={"pointer"}>
        <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
        <Input
          type={"file"}
          hidden
          ref={imageRef}
          onChange={handleImageChange}
        />
      </Flex>
      <Modal
        isOpen={imageURL}
        onClose={() => {
          onClose();
          setImageURL("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mt={5} w={"full"}>
              <Image src={imageURL} />
            </Flex>
            <Flex justifyContent={"flex-end"} my={2}>
              {!isLoading ? (
                <IoSendSharp
                  size={24}
                  cursor={"pointer"}
                  onClick={handleSendMessage}
                />
              ) : (
                <Spinner size={"md"} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MessageInput;
