export const fetchIncomingPayments = async () => {

    const response = await fetch("incomingPayments.json");
  
    const parsedData = await response.json();
  
    return parsedData.data;
  
  };

  