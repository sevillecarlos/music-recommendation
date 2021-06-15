const HashParams = () => {
    var hashParams = {};
    var exec,
      regex = /([^&;=]+)=?([^&;]*)/g,
      query = window.location.search.substring(1);
    exec = regex.exec(query);
    while (exec) {
      hashParams[exec[1]] = decodeURIComponent(exec[2]);
      exec = regex.exec(query);
    }
    console.log(hashParams)
    return hashParams;
  };
  
  export default HashParams;
  