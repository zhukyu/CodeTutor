import { TOGGLE_STATE } from './actionTypes';

const initialState = {
    isTrue: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_STATE:
            return { ...state, isTrue: !state.isTrue };
        default:
            return state;
    }
}
