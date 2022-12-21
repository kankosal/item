import { Invoice } from '../../models';
import { SORT_BY } from '../../constant';
import {
  sortByBuilder,
  dateTimeStringToNumber,
  setTimeToDate,
} from '../../utils';
import getAllAction from '../getAllAction';

const listInvoiceAction = async ({ filter, pager }) => {
  // Prepare order by
  const sortBy = sortByBuilder({ created_at: SORT_BY.DESC });

  let query = {};

  // if exist roleName
  if (filter?.roleName) {
    query = { ...query, role_name: filter?.roleName };
  }

  // if exist dateRange
  if (filter?.startDate && filter?.endDate) {
    query = {
      ...query,
      created_at: {
        $gte: dateTimeStringToNumber(setTimeToDate(filter?.startDate, 0, 0, 0)),
        $lte: dateTimeStringToNumber(
          setTimeToDate(filter?.endDate, 23, 59, 59)
        ),
      },
    };
  }

  const { documents, pagination } = await getAllAction(
    Invoice,
    pager,
    query,
    sortBy
  );

  return {
    invoices: documents || [],
    pagination,
  };
};

export default listInvoiceAction;
