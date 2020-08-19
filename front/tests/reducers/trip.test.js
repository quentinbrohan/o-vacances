import { should } from 'chai';

import tripReducer from 'src/reducers/trip';

import {
  saveTrips,
  saveTrip,
  saveSuggestion,
} from 'src/actions/trip';

should();

describe('reducer for trips', () => {
  it('is a function', () => {
    // assertion
    tripReducer.should.be.a('function');
  });

  it('returns initial state', () => {
    const initialState = {
      trips: [],
      trip: [],
      suggestionDescription: '',
      suggestionTitle: '',
      isLoading: true,
      isCreator: false,
      isOwnUser: false,
      activityTitle: '',
      activityDescription: '',
      activityStartDate: '',
      activityEndDate: '',
      activityCategory: '',
      activityId: '',
      tripPassword: '',
      userDisponibilities: [],
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      password: '',
      location: '',
      haveTripAccess: false,
    };
    //
    tripReducer().should.deep.equal(initialState);
  });

  it('handles action SAVE_TRIPS', () => {
    const stateBefore = {
      trips: [],
      trip: [],
      isLoading: true,
    };

    const tripsData = [
      {
        id: 1,
        title: 'Voyage en Amazonie',
      },
      {
        id: 2,
        title: 'Anniversaire 25 ans',
      },
    ];

    const action = saveTrips(tripsData);

    const expectedResult = {
      trips: tripsData,
      trip: [],
      isLoading: false,
    };

    tripReducer(stateBefore, action).should.deep.equal(expectedResult);
  });

  it('handles action SAVE_TRIP', () => {
    const stateBefore = {
      trips: [],
      trip: [],
      isLoading: true,
      isCreator: false,
      tripPassword: [],
      userDisponibilities: [],
    };

    const tripData = [
      {
        id: 1,
        title: 'Urbex Ukraine',
        description: 'Objectif: ne pas se faire repérer !',
        password: 'Pripyat',
      },
    ];

    const isCreatorData = true;

    const userDisponibilitiesData = [
      {

        startDate: '2020-11-10',
        enDate: '2020-11-15',
      },
    ];

    const action = saveTrip(tripData, isCreatorData, userDisponibilitiesData);

    const expectedResult = {
      trips: [],
      trip: tripData,
      isLoading: false,
      isCreator: true,
      tripPassword: tripData.password,
      userDisponibilities: userDisponibilitiesData[0],
    };

    tripReducer(stateBefore, action).should.deep.equal(expectedResult);
  });

  it('handles action SAVE_SUGGESTION', () => {
    const stateBefore = {
      trip: {
        suggestion: [],
      },
      suggestionTitle: '',
      suggestionDescription: '',
    };

    const suggestionData = {
      title: 'MonSuperTitre',
      description: 'Message de suggestion',
      user: 1,
      trip: 1,
    };

    const action = saveSuggestion(suggestionData);

    const expectedResult = {
      trip: {
        suggestion: [suggestionData],
      },
      suggestionTitle: '',
      suggestionDescription: '',
    };

    tripReducer(stateBefore, action).should.deep.equal(expectedResult);
  });
});
