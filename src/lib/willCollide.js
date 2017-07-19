
export default function(collisionGrid, blockCells) {
  return collisionGrid.some( (row, y) => row.some((full, x) => {
    return blockCells.some( cell => full && cell.x === x && cell.y === y );
  }));
}
