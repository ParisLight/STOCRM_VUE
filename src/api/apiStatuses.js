const getStatuses = async () => {
  try {
    const queryString = `${process.env.VUE_APP_API_URL}/offer/all_statuses?SID=${process.env.VUE_APP_API_SID}&BOARD_ID=${process.env.VUE_APP_API_ID_FUNNEL}`
    const statusesResponse = await fetch(queryString);

    if (!statusesResponse.ok) {
      throw new Error(`Error: ${statusesResponse.status} - ${statusesResponse.statusText}`);
    }

    const statuses = await statusesResponse.json();
    return statuses.RESPONSE;
  } catch (error) {
    console.error("Error in getStatuses:", error);
    throw error;
  }
};

export { getStatuses };