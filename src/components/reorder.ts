import { DraggableLocation } from "react-beautiful-dnd";
import { Row } from "../types";


// my own implementation of removing a row,

// clearRow
export const clearRow = (
  list: any[]
): any[] => {
  const result = list;

  console.log(result)
  return result;
};


// a little function to help us with reordering the result
export const reorder = (
  list: any[], startIndex: number, endIndex: number
): any[] => {
  const result = Array.from(list);

  // startIndex = the one we target, "i"
  // remove the target before the index 1.
  const [removed] = result.splice(startIndex, 1);

  // end index = i + 1, 
  // replace i + 1 elements before index 0, and insert the removed? 
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderRows = (
  rows: Row[],
  source: DraggableLocation,
  destination: DraggableLocation,
) => {


  // gets current row, know its moved by the droppableId
  // const current = [...colors[source.droppableId]];

  // source.droppableId means the source picture row Id
  const current = rows.find(x => x.id === source.droppableId)!; 

  // const next = [...colors[destination.droppableId]];
  // destination = Id of the row you want to move it to 
  const next = rows.find(x => x.id === destination.droppableId)!;

  // target == item that we moved to a different location 
  // const target = current[source.index];

  // goes into current item, current grabs the id to determine which pic
  // then 
  const target = current.urls[source.index];

  // moving to same list

  // if source list is the same as the destination list,
  if (source.droppableId === destination.droppableId) {


    const reordered = reorder(
      current.urls,
      source.index,
      destination.index,
    );

    // if the id of the row we want to move to `x` is the same as the id of the `current` row its in, 
    // keep all the values in the current row, and just pass in the new rearranged list
    // of the current row
    // else
    // return row as is.

    return rows.map(x => (x.id === current.id ? { ...x, urls:reordered }: x))

  }

  // moving to different list

  // splice changes the array in place ( cuts it away from the array) 
  // remove from original
  current.urls.splice(source.index, 1);
  // insert into next
  next.urls.splice(destination.index, 0, target);

  return rows.map(x => {
    if (current.id === x.id) {
      return {
        ...x,
        urls: current.urls
      };
    } else if (next.id === x.id) {
      return {
        ...x,
        urls: next.urls
      };
    }
    
    return x;
  });

  // if current changed, or next changed, 
  // {    
  //   ...colors,
  //   [source.droppableId]: current,
  //   [destination.droppableId]: next
  // };
};