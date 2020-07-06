import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Row } from "../types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  Paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
      width: theme.spacing(16),
      height: theme.spacing(10)
    }
  },
  Button: {
    "& > *": {
      width: "em",
      height: theme.spacing(2),
      left: "1"
    }
  },
  Textfield: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      height: "5ch"
    }
  }
}));

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  onUp: () => void;
  onDown: () => void;
  onClear: () => void;
  onLabelChange: (newText: string) => void;
}

export const AuthorList: React.FC<Props> = ({
  listId,
  listType,
  row,
  onUp,
  onDown,
  onLabelChange,
  onClear
}) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <div>
          <TextField
            className={classes.Textfield}
            id="outlined-basic"
            label="Tier Name"
            variant="outlined"
            value={row.label}
            onChange={e => onLabelChange(e.target.value)}
          />
        </div>

        <div>
          <Button
            className={classes.Button}
            variant="outlined"
            color="primary"
            onClick={onUp}
          >
            Move Row Up
          </Button>
        </div>

        <div>
          <Button
            className={classes.Button}
            variant="outlined"
            color="primary"
            onClick={onDown}
          >
            Move Row Down
          </Button>
        </div>
      </div>

      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {dropProvided => (
          <div
            {...dropProvided.droppableProps}
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "#DCDCDC",
              margin: 20,
              minHeight: 60,
              overflowX: "auto"
            }}
            ref={dropProvided.innerRef}
          >
            {row.urls.map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {dragProvided => (
                  // inside this div this is what renders

                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    
                    <Avatar
                      // className={classes.Paper}
                      // style={{ backgroundColor: url }}
                      // variant="outlined"
                      // elevation={10}
                      style={{
                        height: "60px",
                        width: "60px",
                      }}
                      src={url}
                    >
                      {/* <img style={{ width: 75 }} src={url} /> */}
                    </Avatar>
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
