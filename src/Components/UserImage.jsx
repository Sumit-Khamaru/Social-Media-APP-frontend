import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const UserImage = ({ image, size = "60px", userImg}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={userImg}
      />
    </Box>
  );
};

export default UserImage;