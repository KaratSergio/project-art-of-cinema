export const selectSeries = state => state.series;
export const selectError = state => state.error;
export const selectStatus = state => state.status;
export const selectSeriesReviews = state => state.series.seriesReviews || [];
export const selectSeriesCredits = state => state.series.seriesCredits?.cast || [];