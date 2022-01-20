export const fetchOutgoingPayments = async () => {

    const response = await fetch("outgoingPayments.json");
  
    const parsedData = await response.json();
  
    return parsedData.data;
  
  };