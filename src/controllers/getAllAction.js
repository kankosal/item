/* istanbul ignore file */
import ENV from '../constant/envConstant';

const getAllDocuments = async (model, pager, query, orderBy) => {
  const sortBy = orderBy || {};
  const defaultPager = { page: 1, limit: ENV.ROW_LIMIT };
  const { page, limit } = Object.assign(defaultPager, pager);

  const totalDocuments = Array.isArray(query)
    ? await model.countDocuments(query[0].$match)
    : await model.countDocuments(query);

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalDocuments / limit);

  let documents = [];
  if (Array.isArray(query)) {
    query.push({ $skip: skip });
    query.push({ $sort: sortBy });
    query.push({ $limit: limit });
    documents = await model.aggregate(query);
  } else {
    documents = await model.find(query).skip(skip).limit(limit).sort(sortBy);
  }

  let fromItem = skip + 1;
  let toItem = documents.length + skip;
  if (documents.length < 1) {
    fromItem = 0;
    toItem = 0;
  }
  const pagination = {
    currentPage: page,
    lastPage: totalPages,
    from: fromItem,
    to: toItem,
    perPage: limit,
    total: totalDocuments,
  };

  return { documents, pagination };
};

export default getAllDocuments;
