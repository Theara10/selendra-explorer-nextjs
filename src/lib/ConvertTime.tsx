const timeAgo = (timestamp: string): string => {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();
  const timeDifference: number = now.getTime() - date.getTime();
  const secondsAgo: number = Math.floor(timeDifference / 1000);
  const minutesAgo: number = Math.floor(secondsAgo / 60);
  const hoursAgo: number = Math.floor(minutesAgo / 60);
  const daysAgo: number = Math.floor(hoursAgo / 24);

  if (daysAgo > 0) {
    return daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? 'An hour ago' : `${hoursAgo} hours ago`;
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? 'A minute ago' : `${minutesAgo} mins ago`;
  } else {
    return secondsAgo <= 1 ? 'Just now' : `${secondsAgo} secs ago`;
  }
};

export default timeAgo;

