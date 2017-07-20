export default function(lines) {
  return {
    type: 'REMOVE_LINES',
    payload: lines
  };
}
