import { Box } from "@mui/material";
import { ReactNode } from "react";

const TabPanel: React.FC<{
    index: number;
    value: number;
    children?: ReactNode;
  }> = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  export default TabPanel;