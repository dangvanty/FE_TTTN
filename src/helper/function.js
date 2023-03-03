export const formatDate = (e) => {
  var year = e.substr(0, 4);
  var month = e.substr(5, 2);
  var day = e.substr(8, 2);
  return day + '/' + month + '/' + year;
};
export const checkArrayEquar = (a, b) => {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
};
export const countPagination = (e, i) => {
  if (i) {
    return Math.ceil(e / 8);
  } else {
    return Math.ceil(e / 10);
  }
};

export const getName = (e) => {
  let index = e.lastIndexOf(' ');
  var firtName = e.slice(0, index);
  var lastName = e.slice(index + 1);
  return { firtsName: firtName, lastName: lastName };
};
export const getMale = (e) => {
  if (e === 1) {
    return 'Nam';
  } else {
    return 'Nữ';
  }
};
export const setMale = (e) => {
  if (e === 'Nam') {
    return 1;
  } else {
    return 0;
  }
};
