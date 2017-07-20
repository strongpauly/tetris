
export default function(collisionMap, blockCells) {
  return blockCells.some( cell => collisionMap.hasOwnProperty(cell.x + ',' + cell.y));
}
