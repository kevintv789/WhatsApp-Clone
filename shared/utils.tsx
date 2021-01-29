import moment from "moment";

export const formatDate = (date: string) => {
  let newDate = moment(date);
  let currDate = moment(new Date());

  const diffDates = currDate.diff(newDate, "days");

  let result = "";

  if (diffDates < 1) {
    result = "Today";
  } else if (diffDates === 1) {
    result = "Yesterday";
  } else {
    result = newDate.format("DD/MM/YYYY");
  }

  return result;
};
