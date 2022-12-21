import { Hero } from '../../models';
import { SORT_BY } from '../../constant';
import {
  sortByBuilder,
  dateTimeStringToNumber,
  setTimeToDate,
} from '../../utils';
import getAllAction from '../getAllAction';

const listHeroAction = async ({ filter, pager }) => {
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
    Hero,
    pager,
    query,
    sortBy
  );

  return {
    heroes: documents || [],
    pagination,
  };
};

export default listHeroAction;
