import React from 'react';
jest.mock('jwt-decode', ()=>({
	__esModule:true,
	'default':  (obj)=>obj
}));
import jwtDecode from 'jwt-decode';
import auth from '../../src/reducers/auth';
import { 
	HIDE_NOTIFICATION,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGOUT_USER,
	REGISTER_USER_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	FETCH_USER_STATUS_REQUEST,
	FETCH_USER_STATUS_SUCCESS,
	FETCH_USER_STATUS_FAILURE,
	SET_USER_STATUS_REQUEST,
	SET_USER_STATUS_SUCCESS,
	SET_USER_STATUS_FAILURE
} from "../../src/constants";


describe('Authentication Reducer', () => {
	let state, initialState

	beforeEach(()=>{
        state = {}
        initialState = {
            token: null,
			userName: null,
			authId: null,
			is_active: true,
			pass_msg: null,
			fail_msg: null,
			isSaving: false,
			isFetching: false,
			isAuthenticated: false,
			isAuthenticating: false,
			statusText: null,
			isRegistering: false,
			isRegistered: false,
			registerStatusText: null,
        }
	});

	it('should return the initial state', () => {
		expect(auth(undefined, {})).toEqual(initialState);
	});

	it('should handle HIDE_NOTIFICATION', () => {
		expect( auth(state, { 
			type: HIDE_NOTIFICATION,
		})).toEqual({
			pass_msg: null,
        		fail_msg: null,
		});
	});

	it('should handle LOGIN_USER_REQUEST', () => {
		expect( auth(state, { 
			type: LOGIN_USER_REQUEST,
		})).toEqual({
			isAuthenticating: true,
            statusText: null,
		});
	});
	it('should handle LOGIN_USER_SUCCESS', () => {
		const fakePayload = {
			token:{
				email:'fake@email.com',
				id:1234
			}
		}
		
		expect( auth(state, { 
			type: LOGIN_USER_SUCCESS,
			payload: fakePayload
		})).toEqual({
			isAuthenticating: false,
			isAuthenticated: true,
			token: fakePayload.token,
			userName: jwtDecode(fakePayload.token).email,
			authId: jwtDecode(fakePayload.token).id,
			statusText: 'You have been successfully logged in.',
		});
	});

	it('should handle LOGIN_USER_FAILURE', () => {
		const fakePayload = {
			statusText: "fake status text",
			status: 404
		}
		expect( auth(state, { 
			type: LOGIN_USER_FAILURE,
			payload: fakePayload
		})).toEqual({
			isAuthenticating: false,
			isAuthenticated: false,
			token: null,
			userName: null,
			statusText: `Authentication Error: ${fakePayload.status} ${fakePayload.statusText}`,
		});
	});

	it('should handle LOGOUT_USER', () => {
		expect( auth(state, { 
			type: LOGOUT_USER
		})).toEqual({
			isAuthenticated: false,
            	token: null,
            	userName: null,
            	statusText: 'You have been successfully logged out.',
		});
	});

	it('should handle REGISTER_USER_SUCCESS', () => {
		const fakePayload = {
			token:{
				email:'fake@email.com'
			}
		}

		expect( auth(state, { 
			type: REGISTER_USER_SUCCESS,
			payload: fakePayload
		})).toEqual({
			isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            token: fakePayload.token,
            userName: jwtDecode(fakePayload.token).email,
            registerStatusText: 'You have been successfully logged in.',
		});
	});

	it('should handle REGISTER_USER_REQUEST', () => {
		expect( auth(state, { 
			type: REGISTER_USER_REQUEST
		})).toEqual({
			isRegistering: true,
		});
	});
	
	it('should handle REGISTER_USER_FAILURE', () => {
		const fakePayload = {
			statusText: "fake status text",
			status: 404
		}
		expect( auth(state, { 
			type: REGISTER_USER_FAILURE,
			payload: fakePayload
		})).toEqual({
			isAuthenticated: false,
            token: null,
            userName: null,
            registerStatusText: `Register Error: ${fakePayload.status} ${fakePayload.statusText}`,
		});
	});

	it('should handle FETCH_USER_STATUS_REQUEST', () => {
		expect( auth(state, { 
			type: FETCH_USER_STATUS_REQUEST
		})).toEqual({
			isFetching: true,
		});
	});

	it('should handle FETCH_USER_STATUS_SUCCESS', () => {
		const fakePayload = {
			is_active:false
		}
		expect( auth(state, { 
			type: FETCH_USER_STATUS_SUCCESS,
			payload: fakePayload
		})).toEqual({
			isFetching: false,
            is_active: fakePayload.is_active,
		});
	});

	it('should handle FETCH_USER_STATUS_FAILURE', () => {
		const fakePayload = {
			statusText: "fake status text",
			status: 404
		}
		expect( auth(state, { 
			type: FETCH_USER_STATUS_FAILURE,
			payload: fakePayload
		})).toEqual({
			isFetching: false,
            fail_msg: `${fakePayload.status} (${fakePayload.statusText})`,
		});
	});

	it('should handle SET_USER_STATUS_REQUEST', () => {
		expect( auth(state, { 
			type: SET_USER_STATUS_REQUEST
		})).toEqual({
			isSaving: true,
		});
	});

	it('should handle SET_USER_STATUS_SUCCESS', () => {
		expect( auth(state, { 
			type: SET_USER_STATUS_SUCCESS
		})).toEqual({
			isSaving: false,
            pass_msg: 'Status Changed Successfully!',
		});
	});

	it('should handle SET_USER_STATUS_FAILURE', () => {
		const fakePayload = {
			statusText: "fake status text",
			status: 404
		}
		expect( auth(state, { 
			type: SET_USER_STATUS_FAILURE,
			payload: fakePayload
		})).toEqual({
			fail_msg: `${fakePayload.status} (${fakePayload.statusText})`,
		});
	});
});