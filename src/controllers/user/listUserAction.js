import { User } from '../../models';
import { SORT_BY } from '../../constant';
import {
  sortByBuilder,
  dateTimeStringToNumber,
  setTimeToDate,
} from '../../utils';
import getAllAction from '../getAllAction';

const listUserAction = async ({ filter, pager, mysabayUserId }) => {
  // Prepare order by
  const sortBy = sortByBuilder({ txn_date: SORT_BY.DESC });

  let query = {
    mysabay_user_id: mysabayUserId,
  };

  // if exist txnType
  if (filter?.txnType) {
    query = { ...query, txn_type: filter?.txnType };
  }

  // if exist dateRange
  if (filter?.startDate && filter?.endDate) {
    query = {
      ...query,
      txn_date: {
        $gte: dateTimeStringToNumber(setTimeToDate(filter?.startDate, 0, 0, 0)),
        $lte: dateTimeStringToNumber(
          setTimeToDate(filter?.endDate, 23, 59, 59)
        ),
      },
    };
  }

  const { documents, pagination } = await getAllAction(
    User,
    pager,
    query,
    sortBy
  );

  return {
    users: documents || [],
    pagination,
  };
};

export default listUserAction;
