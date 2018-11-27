const uniqueID = () => {
  let idStr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    const ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      idStr += String.fromCharCode(ascicode);
    }
  } while (idStr.length < 32);

  return idStr;
};

module.exports = uniqueID;
