export async function generateLast12MonthsData(model) {
  const last12Months = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);
    const month = endDate.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
    // console.log(await model.find());
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate
      }
    });
    last12Months.push({ month, count });

  }
  return last12Months;
}