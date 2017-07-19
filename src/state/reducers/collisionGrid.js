

export default function(grid=null, action) {
  if(action.type === 'START') {
    //Initialise with a 20 x 10 2d array.
    grid = new Array(20).fill(false).map(() => new Array(10).fill(false));
  } else if (action.type === 'BLOCK_STOP') {
    grid = grid.map( (row, y) => {
      return row.map( (full, x) => {
        return full || action.payload.some( cell => cell.x === x && cell.y === y);
      });
    });
  }
  return grid;
}
