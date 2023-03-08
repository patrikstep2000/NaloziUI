import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Option } from "../../Models/Option";

const ITEM_HEIGHT = 48;

const ThreeDotsDropDown: React.FC<{
  options: Option[];
  id: String;
  values: any;
}> = ({ options, id, values }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option: Option) => (
          <MenuItem
            key={option.name}
            disabled={
              option.disabled
                ? option.disabled(values[option.field || "id"])
                : false
            }
            onClick={() => {
              option.action(id, option.field && values[option.field]);
              handleClose();
            }}
          >
            {option.formatter
              ? option.formatter(values[option.field || "id"])
              : option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsDropDown;
