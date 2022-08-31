import { createSelector } from 'reselect';

export const classesStateSelector = (state) => state.classes;

export const parentClassSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('fetchOneClass')
);

export const addClassesParentSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('addClass')
);

export const addClassesSelector = createSelector(
  addClassesParentSelector,
  (addClass) => addClass.get('form')
);

export const addClassesPendingSelector = createSelector(
  addClassesSelector,
  (addClasses) => addClasses.get('pending')
);

export const newClassesSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('newClasses')
);

export const newClassesPendingSelector = createSelector(
  newClassesSelector,
  (newClasses) => newClasses.get('pending')
);

export const fetchOneClassSelector = createSelector(
  parentClassSelector,
  (fetchOneClass) => fetchOneClass.get('classdetail')
);

export const fetchOneClassPendingSelector = createSelector(
  parentClassSelector,
  (fetchOneClass) => fetchOneClass.get('pending')
);

export const updatedClassParentSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('updatedClass')
);

export const updatedClassSelector = createSelector(
  updatedClassParentSelector,
  (updatedClass) => updatedClass.get('updatedClass')
);

export const updatedClassPendingSelector = createSelector(
  classesStateSelector,
  (updatedClass) => updatedClass.get('updatepending')
);
