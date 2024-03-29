import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.userName}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
    // <>
    //   <Flex gap={4} py={2} my={2} w={"full"}>
    //     <Avatar cursor={"pointer"} src={userAvatar} size={"sm"} />
    //     <Flex gap={1} w={"full"} flexDirection={"column"}>
    //       <Flex
    //         w={"full"}
    //         justifyContent={"space-between"}
    //         alignItems={"center"}
    //       >
    //         <Text fontSize="sm" fontWeight="bold">
    //           {userName}
    //         </Text>
    //         <Flex gap={2} alignItems={"center"}>
    //           <Text fontSize="sm" color={"gray.light"}>
    //             {createdAt}
    //           </Text>
    //           <BsThreeDots cursor={"pointer"} />
    //         </Flex>
    //       </Flex>
    //       <Text>{comment}</Text>
    //       <Actions liked={liked} setLiked={setLiked} />
    //       <Text fontSize="sm" color={"gray.light"}>
    //         {likes + (liked ? 1 : 0)} likes
    //       </Text>
    //     </Flex>
    //   </Flex>
    //   <Divider />
    // </>
  );
};

export default Comment;
