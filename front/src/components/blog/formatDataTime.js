const formatDateTime = (dateTime) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  return new Date(dateTime).toLocaleString(undefined, options);
}

export default formatDateTime;