import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const HeadingWithButton = ({
  heading,
  notShowButton,
  handleClickButton,
  buttonLabel,
}) => {
  return (
    <div className="flex justify-between items-center ">
      <h4 className="text-2xl font-semibold">{heading}</h4>
      {!notShowButton && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickButton}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default HeadingWithButton;
