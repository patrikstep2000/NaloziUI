import { Button, Card, CardActions, CardContent, SxProps } from "@mui/material";
import React, { SyntheticEvent } from "react";

const InfoCard: React.FC<{
  children: React.ReactNode;
  sx?: SxProps;
  action?: (event: SyntheticEvent) => void;
  actionText?: string;
}> = ({ children, sx, action, actionText }) => {
  return (
    <Card sx={{...sx, minWidth:'300px'}} variant="outlined">
      <CardContent>{children}</CardContent>
      {action && (
        <CardActions >
          <Button onClick={action}>{actionText}</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default InfoCard;
