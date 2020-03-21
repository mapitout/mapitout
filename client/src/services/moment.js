import React from 'react';

const epochs = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
];

const getDuration = (timeAgoInSeconds) => {
  for (let [name, seconds] of epochs) {
      const interval = Math.floor(timeAgoInSeconds / seconds);

      if (interval >= 1) {
          return {
              interval: interval,
              epoch: name
          };
      }
  }
};

// Calculate
const timeAgo = (date) => {
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
  const {interval, epoch} = getDuration(timeAgoInSeconds);
  const suffix = interval === 1 ? '' : 's';

  return `${interval} ${epoch}${suffix} ago`;
};

const getTimeAndDate = (t, options={}) => {
  const time = new Date(t);
  // docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
  const opts = { 
    minute:'2-digit', 
    hour:'2-digit', 
    day: '2-digit',
    month: 'short', 
    ...options 
  };
  const timeString = time.toLocaleDateString('en-US', opts);
  const result = timeString.split(',');
  if(result){
    return (
      <span className='timeAndDate-component'>
        <span className='times'>{result[1].trim().toLowerCase()}</span>
        {`, `}
        <span className='dates'>{result[0].trim()}</span>
      </span>
    )
  }else{
    return <span></span>
  }
}

export {
  timeAgo,
  getTimeAndDate
}