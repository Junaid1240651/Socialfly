import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useShowToast from "../hooks/useShowToast";
import useLoading from "../hooks/useLoading";
import { AddIcon } from "@chakra-ui/icons";
import { setPosts } from "../redux/posts";
import { useParams } from "react-router-dom";
const MAX_CHAR = 500;
const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, setLoading } = useLoading();
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(500);
  const { handleImageChange, imageURL, setImageURL } = usePreviewImage();
  const user = useSelector((state) => state.user.userInfo);
  const imageRef = useRef(null);
  const { userName } = useParams();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.setPosts);
  const showToast = useShowToast();
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };
  const handleCreatePost = async () => {
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/posts/create", {
        postedBy: user._id,
        text: postText,
        img: imageURL,
      });
      if (userName === user.userName) {
        dispatch(setPosts([response.data.newPost, ...posts]));
      }
      showToast("Success", response.data.message, "success");
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setPostText("");
      setImageURL(null);
      setLoading(false);

      onClose();
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Create Post </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                justifyContent={"center"}
                value={postText}
                placeholder="Post Content goes here..."
                onChange={handleTextChange}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign="right"
                my={1}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                ref={imageRef}
                hidden
                onChange={handleImageChange}
              />
              <BsFillImageFill
                size={16}
                onClick={() => imageRef.current.click()}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              />
            </FormControl>
            {imageURL && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageURL} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImageURL("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={isLoading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
