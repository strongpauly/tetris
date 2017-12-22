
export function sound(playSound=false, action) {
  if(action.type === 'MUTE_SOUND') {
    playSound = false;
  } else if (action.type === 'UNMUTE_SOUND') {
    playSound = true;
  }
  return playSound;
}
