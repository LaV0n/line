export const playAudio = (url: string) => {
    new Audio(url).play()
}

export const AudioSource={
    coin:'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
    win:'https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3',
    error:'https://assets.mixkit.co/sfx/preview/mixkit-game-show-wrong-answer-buzz-950.mp3',
    correct:'https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3'
}