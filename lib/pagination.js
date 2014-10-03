function getLimitOffset(page, size) {
  page = page || 1
  size = size || 25;
  if (size > 100) {
    size = 100;
  }
  if (page === 1) {
    return {
      limit: size,
      offset: 0
    };
  }
  return {
    limit: size,
    offset: page * size
  };
};

exports.getLimitOffset = getLimitOffset;

exports.paginate = function paginate(model, page, page_size, next) {
  var result = {};
  var pagination = getLimitOffset(page, page_size);
  model.count(pagination, function(err, count) {
    if (err) {
      return next(err);
    }
    result.count = count;
    model.all(pagination, function(err, resources) {
      if (err) {
        return next(err);
      }
      result.resources = resources;
      next(null, result);
    });
  });
};
