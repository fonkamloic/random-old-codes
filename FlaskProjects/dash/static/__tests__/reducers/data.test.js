import React from 'react';
jest.mock('jwt-decode', ()=>({
	__esModule:true,
	'default':  (obj)=>obj
}));
import jwtDecode from 'jwt-decode';
import data from '../../src/reducers/data';
import { 
	RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST
} from "../../src/constants";


describe('Authentication Reducer -> user data', () => {
	let state, initialState

	beforeEach(()=>{
        state = {}
        initialState = {
            data: null,
            isFetching: false,
            loaded: false,
        }
	});

	it('should return the initial state', () => {
		expect(data(undefined, {})).toEqual(initialState);
	});

	it('should handle RECEIVE_PROTECTED_DATA', () => {
        const fakePayload = {
            data:'fakeData'
        }
		expect( data(state, { 
            type: RECEIVE_PROTECTED_DATA,
            payload: fakePayload
		})).toEqual({
			data: fakePayload.data,
            isFetching: false,
            loaded: true,
		});
	});

	it('should handle FETCH_PROTECTED_DATA_REQUEST', () => {
		expect( data(state, { 
			type: FETCH_PROTECTED_DATA_REQUEST,
		})).toEqual({
			isFetching: true,
		});
	});
});