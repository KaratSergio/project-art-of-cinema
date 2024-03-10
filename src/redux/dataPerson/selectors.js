export const selectPerson = state => state.person.person;
export const selectPersonCredits = state => state.person.cast.cast || [];
