import React from 'react';
import assigner from '../../src/reducers/log';
import { 
	FETCH_ALL_LOGS,
    RECEIVE_ALL_LOGS,
    FETCH_STD_ERR_LOG, 
    RECEIVE_STD_ERR_LOG,
    FETCH_UDACITY_ERR_LOG, 
    RECEIVE_UDACITY_ERR_LOG,
    FETCH_GUNICORN_ERR_LOG, 
    RECEIVE_GUNICORN_ERR_LOG,
    FETCH_PROCESS_ERR_LOG, 
    RECEIVE_PROCESS_ERR_LOG,
    FETCH_ACCOUNT_CODES,
    RECEIVE_ACCOUNT_CODES
} from "../../src/constants";

describe('Logs Reducer', () => {
	let state, initialState

	beforeEach(()=>{
        state = {}
        initialState = {
            isLoaded: false,
            isFetching: false,
            std_err: [],
            udacity_err: [],
            gunicorn_error: [],
            process_err: [],
            sg_err: [],
            isAccountsFetching:false,
            accounts:[]
        }
	});

	it('should return the initial state', () => {
		expect(assigner(undefined, {})).toEqual(initialState);
	});

	it('should handle FETCH_ACCOUNT_CODES', () => {
		expect( assigner(state, { 
			type: FETCH_ACCOUNT_CODES,
		})).toEqual({
			isLoaded: false,
            isAccountsFetching: true
		});
	});

	it('should handle RECEIVE_ACCOUNT_CODES', () => {
		const fakePayload = {
            data:'fakeData',
        }
		expect( assigner(state, { 
			type: RECEIVE_ACCOUNT_CODES,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isAccountsFetching: false,
            accounts: fakePayload
		});
	});

	it('should handle FETCH_ALL_LOGS', () => {
		expect( assigner(state, { 
			type: FETCH_ALL_LOGS
		})).toEqual({
			isLoaded: false,
            isFetching: true, 
		});
    });
    
	it('should handle RECEIVE_ALL_LOGS', () => {
		const fakePayload = {
            std_err:['std_err'],
            udacity_err:['udacity_err'],
            gunicorn_error:['gunicorn_error'],
            process_err:['process_err']
		}

		expect( assigner(state, { 
			type: RECEIVE_ALL_LOGS,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isFetching: false,
            std_err: fakePayload.std_err,
            udacity_err: fakePayload.udacity_err,        
            gunicorn_error: fakePayload.gunicorn_error,
            process_err: fakePayload.process_err,
		});
    });
    
    it('should handle FETCH_STD_ERR_LOG', () => {
		expect( assigner(state, { 
			type: FETCH_STD_ERR_LOG
		})).toEqual({
			isLoaded: false,
            isFetching: true, 
		});
	});
    
    it('should handle RECEIVE_STD_ERR_LOG', () => {
		const fakePayload = {
            std_err:['std_err'],
        }
		expect( assigner(state, { 
			type: RECEIVE_STD_ERR_LOG,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isFetching: false,
            std_err: fakePayload.std_err
		});
    });

    it('should handle FETCH_UDACITY_ERR_LOG', () => {
		expect( assigner(state, { 
			type: FETCH_UDACITY_ERR_LOG
		})).toEqual({
			isLoaded: false,
            isFetching: true, 
		});
	});
    
    it('should handle RECEIVE_UDACITY_ERR_LOG', () => {
		const fakePayload = {
            result:['udacity_err'],
        }
		expect( assigner(state, { 
			type: RECEIVE_UDACITY_ERR_LOG,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isFetching: false,
            udacity_err: fakePayload.result
		});
    });

    it('should handle FETCH_GUNICORN_ERR_LOG', () => {
		expect( assigner(state, { 
			type: FETCH_GUNICORN_ERR_LOG
		})).toEqual({
			isLoaded: false,
            isFetching: true, 
		});
	});
    
    it('should handle RECEIVE_GUNICORN_ERR_LOG', () => {
		const fakePayload = {
            gunicorn_error:['gunicorn_err'],
        }
		expect( assigner(state, { 
			type: RECEIVE_GUNICORN_ERR_LOG,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isFetching: false,
            gunicorn_error: fakePayload.gunicorn_error,
		});
    });

    it('should handle FETCH_PROCESS_ERR_LOG', () => {
		expect( assigner(state, { 
			type: FETCH_PROCESS_ERR_LOG
		})).toEqual({
			isLoaded: false,
            isFetching: true, 
		});
	});
    
    it('should handle RECEIVE_PROCESS_ERR_LOG', () => {
		const fakePayload = {
            process_err:['process_err'],
        }
		expect( assigner(state, { 
			type: RECEIVE_PROCESS_ERR_LOG,
			payload: fakePayload
		})).toEqual({
			isLoaded: true,
            isFetching: false,
            process_err: fakePayload.process_err
		});
    });
    
});