import moment from 'moment';
import jwt from 'jsonwebtoken';

/* istanbul ignore file */
export const sortByBuilder = (orderBy) => {
  const sortBy = {};
  Object.keys(orderBy).forEach((key) => {
    const fieldName = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );

    let direction = -1;
    if (orderBy[key] !== 'desc') direction = 1;
    sortBy[fieldName] = direction;
  });

  return sortBy;
};

export const checkDateFormatAndThrowError = (str) => {
  if (!str || str.length < 1) {
    return null;
  }

  const args = str.split(' ');
  const date = args[0].split('-');
  // format yyyy-mm-dd
  const reg = /(19|20)\d\d[-.](0[1-9]|1[012])[-.](0[1-9]|[12][0-9]|3[01])/;

  if (
    !args[0].match(reg) ||
    !/^-?\d+$/.test(date[0]) ||
    !/^-?\d+$/.test(date[1]) ||
    !/^-?\d+$/.test(date[2])
  ) {
    throw new Error('Invalid date format');
  } else if (args.length > 1) {
    const time = args[1].split(':');
    if (time.length < 2) {
      throw new Error('Time must be hours:minutes format');
    } else if (!/^-?\d+$/.test(time[0]) || !/^-?\d+$/.test(time[1])) {
      throw new Error('Invalid time format');
    }
  }

  return null;
};

/**
 * Try convert given string to JSON object
 *
 * @param {string} data The target string to convert to JSON object.
 * @return {boolean} false If the given string can't be converted to JSON object.
 * @return {object} JSON If the successful converted to JSON object.
 */
export const tryParseJSONObject = (data) => {
  if (!data) return false;

  return /^[\],:{}\s]*$/.test(
    data
      .replace(/\\["\\\\/bfnrtu]/g, '@')
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?/g,
        ']'
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  )
    ? JSON.parse(data)
    : false;
};

/**
 * Check if given datetime is today
 *
 * @param {string} dateTimeString The target string to check.
 * @return {boolean}
 */
export const isToday = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

/**
 * Convert string of datetime to timestamp in second
 *
 * @param {string} dateTimeString The target string to convert to timestamp.
 * @return {number}
 */
export const dateTimeStringToNumber = (dateTimeString) => {
  return new Date(dateTimeString).getTime() / 1000;
};
/**
 * Check if string contains only numbers
 *
 * @param {string} n The string to check.
 * @return {boolean} false If string does not contain only number.
 * @return {number} n If string contains only number.
 */
export const isNumber = (n) => {
  if (!/^-?\d+$/.test(n)) {
    return false;
  }

  return parseInt(n, 10);
};

/**
 * Check if date format is yyyy-mm-dd
 *
 * @param {string} date The string to check.
 * @return {boolean}
 */
export const checkDateFormat = (date) => {
  // pattern
  const reg = /(19|20)\d\d[-.](0[1-9]|1[012])[-.](0[1-9]|[12][0-9]|3[01])/;
  if (!date.match(reg)) {
    return false;
  }

  const args = date.split('-');
  for (let i = 0; i < args.length; i += 1) {
    const value = args[i];
    // check for yyyy format
    if (i === 0 && (!isNumber(value) || value.length !== 4)) {
      return false;
    }

    // check for dd or mm format
    if (i > 0 && (!isNumber(value) || value.length !== 2)) {
      return false;
    }
  }

  return true;
};

/**
 * Check if datetime string contain a valid datetime format
 *
 * @param {string} str The string to check.
 * @return {boolean}
 */
export const isValidDateFormat = (str) => {
  if (!str || str.length < 1) {
    return false;
  }

  const args = str.split(' ');
  if (!checkDateFormat(args[0])) {
    return false;
  }

  if (args.length > 1) {
    const time = args[1].split(':');

    // 'Time must be hours:minutes format'
    // 'Invalid time format'
    if (time.length < 2 || !isNumber(time[0]) || !isNumber(time[1])) {
      return false;
    }
  }

  return true;
};

/**
 * Set time to date if startDate set to 0:0:0 and endDate set to 23:59:59
 * @param {String} dateString
 * @param {Int} hour
 * @param {Int} minute
 * @param {Int} second
 * @returns {String}
 */
export const setTimeToDate = (
  dateString,
  hour = 23,
  minute = 59,
  second = 59
) => {
  const datetime = moment(dateString);
  const d = datetime.set({ hour, minute, second });
  return d;
};

export const decodeAccessToken = (accessToken, secretKey) => {
  const decoded = jwt.verify(accessToken, secretKey);
  return decoded;
};
