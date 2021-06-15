export const hashParams = () => {
  const hashParams = {};
  let exec,
    regex = /([^&;=]+)=?([^&;]*)/g,
    query = window.location.hash.substring(1);
  exec = regex.exec(query);
  while (exec) {
    hashParams[exec[1]] = decodeURIComponent(exec[2]);
    exec = regex.exec(query);
  }

  return hashParams;
};

