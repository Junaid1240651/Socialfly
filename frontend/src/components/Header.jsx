import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { setAuthScreenStatus } from "../redux/auth";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state.user.userInfo);
  const logout = useLogout();
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}

      {user && (
        <Image
          cursor={"pointer"}
          alt="logo"
          w={"120px"}
          src={colorMode === "dark" ? "/light-logo.png" : "/dark-logo.png"}
          onClick={toggleColorMode}
        />
      )}
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.userName}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
