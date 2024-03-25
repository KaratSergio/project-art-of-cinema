export const selectPerson = state => state.person.person;
export const selectPersonCredits = state => state.person.credits?.cast || [];

export const selectTrendingPersons = state => state.person.trendingPersons;
