const getOffers = async () => {
  try {
    const queryString = `${process.env.VUE_APP_API_URL}/offers/get_from_filter?SID=${process.env.VUE_APP_API_SID}`
    const responseOffers = await fetch(queryString);

    if (!responseOffers.ok) {
      throw new Error(`Error: ${responseOffers.status} - ${responseOffers.statusText}`);
    }

    const offers = await responseOffers.json();
    return offers.RESPONSE;
  } catch (error) {
    console.error("Error in getOffers:", error);
    throw error; 
  }
};

export { getOffers };