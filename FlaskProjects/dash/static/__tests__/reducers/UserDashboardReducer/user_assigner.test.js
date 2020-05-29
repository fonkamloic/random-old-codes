import React from 'react';
import assigner from '../../../src/reducers/UserDashboardReducers/user_assigner';
import { 
	HIDE_NOTIFICATION,
    FETCH_USER_ACCOUNT_REQUEST,
    RECEIVE_USER_ACCOUNT_DATA,
    RECEIVE_USER_CERTIFIED_PROJECT_DATA,
	FETCH_USER_CERTIFIED_PROJECT_REQUEST,
	DELETE_USER_SUBMISSION_REQUEST,
    POST_USER_SUBMISSION_REQUEST,
    UPDATE_USER_SUBMISSION_REQUEST,
    UNASSIGN_USER_SUBMISSION,
    START_SIMULATION_REQUEST,
    STOP_SIMULATION_REQUEST,
    FETCH_PROJECT_FILE_REQUEST,
    RECEIVE_PROJECT_FILE_DATA
} from "../../../src/constants";


describe('UserDashboard Reducer -> user_assigner', () => {
	let state, initialState

	beforeEach(()=>{
        state = {}
        initialState = {
            accounts: [],
            cert_projects: [],
            project_files: [],
            pass_msg: null,
            fail_msg: null,
			isFetching: false,
			isUserAccountFetching:false,
			isDeleting:false,
            isSaving: false,
            isUpdating: false,
            isUnassigning: false,
            isSimulating: false,
            loaded: false
        }
	});

	it('should return the initial state', () => {
		expect(assigner(undefined, {})).toEqual(initialState);
	});

	it('should handle HIDE_NOTIFICATION', () => {
		expect( assigner(state, { 
			type: HIDE_NOTIFICATION,
		})).toEqual({
			pass_msg: null,
        	fail_msg: null,
		});
	});

	it('should handle LOGIN_USER_SUCCESS', () => {
		const fakePayload = {
			hide_assigners_menu:true
		}
		
		expect( assigner(state, { 
			type: RECEIVE_USER_ACCOUNT_DATA,
			payload: fakePayload
		})).toEqual({
			accounts: fakePayload.accounts,
            hide_assigners_menu: fakePayload.hide_assigners_menu,
            isUserAccountFetching:false,
            loaded: true,
		});
	});

	it('should handle RECEIVE_USER_CERTIFIED_PROJECT_DATA', () => {
		const fakePayload = {
            projects:'fakeProjects',
        }
		expect( assigner(state, { 
			type: RECEIVE_USER_CERTIFIED_PROJECT_DATA,
			payload: fakePayload
		})).toEqual({
			cert_projects: fakePayload.projects,
            pass_msg: fakePayload.pass_msg,
            fail_msg: fakePayload.fail_msg,
            isFetching: false,
            loaded: true,
		});
	});

	it('should handle FETCH_USER_ACCOUNT_REQUEST', () => {
		expect( assigner(state, { 
			type: FETCH_USER_ACCOUNT_REQUEST
		})).toEqual({
			isUserAccountFetching:true,
            loaded: false,
		});
    });
    
    it('should handle FETCH_USER_CERTIFIED_PROJECT_REQUEST', () => {
		expect( assigner(state, { 
			type: FETCH_USER_CERTIFIED_PROJECT_REQUEST
		})).toEqual({
			isFetching: true,
            loaded: false,
		});
    });
    
    it('should handle POST_USER_SUBMISSION_REQUEST', () => {
		expect( assigner(state, { 
			type: POST_USER_SUBMISSION_REQUEST
		})).toEqual({
			isSaving: true,
            loaded: false,
		});
	});

	it('should handle POST_USER_SUBMISSION_REQUEST', () => {
		expect( assigner(state, { 
			type: DELETE_USER_SUBMISSION_REQUEST
		})).toEqual({
			isDeleting: true,
            loaded: false,
		});
	});
    
    it('should handle UPDATE_USER_SUBMISSION_REQUEST', () => {
		expect( assigner(state, { 
			type: UPDATE_USER_SUBMISSION_REQUEST
		})).toEqual({
			isUpdating: true,
            loaded: false,
		});
    });
    
    it('should handle UNASSIGN_USER_SUBMISSION', () => {
		expect( assigner(state, { 
			type: UNASSIGN_USER_SUBMISSION
		})).toEqual({
			isUnassigning: true,
            loaded: false,
		});
    });
    
    it('should handle START_SIMULATION_REQUEST', () => {
		expect( assigner(state, { 
			type: START_SIMULATION_REQUEST
		})).toEqual({
			isSimulating: true,
            loaded: false,
            selected: []
		});
    });
    
    it('should handle STOP_SIMULATION_REQUEST', () => {
		expect( assigner(state, { 
			type: STOP_SIMULATION_REQUEST
		})).toEqual({
			isSimulating: true,
            loaded: false,
            selected: []
		});
	});

	it('should handle REGISTER_USER_SUCCESS', () => {
		const fakePayload = {
			data:'fake data'
		}

		expect( assigner(state, { 
			type: RECEIVE_PROJECT_FILE_DATA,
			payload: fakePayload
		})).toEqual({
			project_files: fakePayload,
            isFetching: false,
            loaded: true,
		});
    });
    
    it('should handle STOP_SIMULATION_REQUEST', () => {
		expect( assigner(state, { 
			type: STOP_SIMULATION_REQUEST
		})).toEqual({
			isSimulating: true,
            loaded: false,
            selected: []
		});
	});

	it('should handle FETCH_PROJECT_FILE_REQUEST', () => {
		expect( assigner(state, { 
			type: FETCH_PROJECT_FILE_REQUEST
		})).toEqual({
			isFetching: true,
            loaded: false,
		});
	});
});