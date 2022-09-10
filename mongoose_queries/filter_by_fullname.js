function sortByFullname(value) {


let filter;

if (value) {
  value = replacerForRegex(value);
  const fullname = value.split(' ');
  if (fullname[0] && fullname[1]) {
    filter = {
      $or: [
        {
          $and: [
            {'firstName': new RegExp(fullname[0], 'i')},
            {'lastName': new RegExp(fullname[1], 'i')},
          ]
        },
        {
          $and: [
            {'firstName': new RegExp(fullname[1], 'i')},
            {'lastName': new RegExp(fullname[0], 'i')},
          ]
        },
      ]
    };
  } else {
    value = value.trim();

    filter = {
      $or: [
        {'firstName': new RegExp(value, 'i')},
        {'lastName': new RegExp(value, 'i')},
      ]
    };
  }

} else {
  filter = {};
}

return filter;
}