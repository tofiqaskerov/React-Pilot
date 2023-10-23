
export const analyzeData = (data) => {
  
    const status0Count = data.filter(item => item.status === 0).length;
    const status1Count = data.filter(item => item.status === 1).length;
    const total = data.length;
    const status0Percentage = Math.ceil((status0Count / total) * 100);
    const status1Percentage = Math.ceil((status1Count / total) * 100);

    const status0TotalLen = data
    .filter(item => item.status === 0)
    .reduce((total, item) => total + item.len, 0);

  const status1TotalLen = data
    .filter(item => item.status === 1)
    .reduce((total, item) => total + item.len, 0);
  
    return {

      status0Percentage,
      status1Percentage,
      status0TotalLen,
      status1TotalLen
    };
  };