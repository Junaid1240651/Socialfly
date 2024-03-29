import {
  Avatar,
  Box,
  Text,
  Flex,
  VStack,
  Link,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  Button,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import useShowToast from "../hooks/useShowToast";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
const UserHeader = ({ user }) => {
  const showToast = useShowToast();
  const currentUser = useSelector((state) => state.user.userInfo);
  const { colorMode } = useColorMode();
  const { handleFollowUnfollow, following, isLoading } =
    useFollowUnfollow(user);

  const copyURL = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success", "Profile link copied", "success");
    });
  };
  if (!user) return null;
  return (
    <VStack gap={4} align={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user?.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.userName}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              socialfly
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              size={{
                base: "md",
                md: "xl",
              }}
              src={user.profilePic}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              size={{
                base: "md",
                md: "xl",
              }}
              src="https://avatars.githubusercontent.com/u/8108337?v=3&s=400"
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/profile">
          <Button>Update Profile</Button>
        </Link>
      )}{" "}
      {currentUser?._id !== user._id && (
        <Button onClick={handleFollowUnfollow} isLoading={isLoading}>
          {following ? "UnFollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers?.length} Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>socialfly.com</Link>
        </Flex>
        <Flex>
          <Image
            w={20}
            src={colorMode === "dark" ? "/light-logo.png" : "/dark-logo.png"}
          />

          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"} pb={2} fontSize={24}>
            Socialfly Post
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
