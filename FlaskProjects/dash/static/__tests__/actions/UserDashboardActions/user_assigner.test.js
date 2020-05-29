import React from 'react';
import * as assigner from '../../../src/actions/UserDashboardActions/user_assigner';
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { 
	HIDE_NOTIFICATION,
    FETCH_USER_ACCOUNT_REQUEST,
    RECEIVE_USER_ACCOUNT_DATA,
    RECEIVE_USER_CERTIFIED_PROJECT_DATA,
    FETCH_USER_CERTIFIED_PROJECT_REQUEST,
    POST_USER_SUBMISSION_REQUEST,
    DELETE_USER_SUBMISSION_REQUEST,
    UPDATE_USER_SUBMISSION_REQUEST,
    UNASSIGN_USER_SUBMISSION,
    START_SIMULATION_REQUEST,
    STOP_SIMULATION_REQUEST,
    FETCH_PROJECT_FILE_REQUEST,
    RECEIVE_PROJECT_FILE_DATA
} from "../../../src/constants";


const fakePayload = 'fakePayload'
const fakeTokenData={
    token:'fake token'
}

function configMockStore(){
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({})

    return store
}

describe('UserDashboard Action Creators -> user_assigner', ()=>{

    function resolvedAxiosGetSetup(){
        const result={data:{result:fakePayload}}
        const promise = Promise.resolve(result)
        axios.get = jest.fn(url => promise)
    }

    function resolvedAxiosPostSetup(){
        const result={data:{result:fakePayload}}
        const promise = Promise.resolve(result)
        axios.post = jest.fn(url => promise)
    }

    function resolvedAxiosPutSetup(){
        const result={data:{result:fakePayload}}
        const promise = Promise.resolve(result)
        axios.put = jest.fn(url => promise)
    }

    function rejectedAxiosGetSetup(statusText){
        const err={status:401, statusText}
        const promise = Promise.reject(err)
        axios.get = jest.fn(url => promise)
    }

    function rejectedAxiosPostSetup(statusText){
        const err={status:401, statusText}
        const promise = Promise.reject(err)
        axios.post = jest.fn(url => promise)
    }

    function rejectedAxiosPutSetup(statusText){
        const err={status:401, statusText}
        const promise = Promise.reject(err)
        axios.put = jest.fn(url => promise)
    }

    beforeEach(()=>{
        resolvedAxiosGetSetup()
        localStorage.getItem = jest.fn()
        localStorage.removeItem = jest.fn()
        localStorage.setItem = jest.fn()
        window.browserHistory = {
            push:jest.fn()
        }
    })

    afterEach(()=>{
        axios.get.mockReset()
        axios.get.mockRestore()
    })

    it('should hideNotification', ()=>{
        expect(assigner.hideNotification()).toEqual({
            type: HIDE_NOTIFICATION,
        })
    });

    it('should receiveAccountData', ()=>{
        const data = 'fake Data'
                       
        expect(assigner.receiveAccountData( data ))
        .toEqual({
            type: RECEIVE_USER_ACCOUNT_DATA,
            payload: data                
        })
    });

    it('should fetchAccountRequest', ()=>{
        expect(assigner.fetchAccountRequest()).toEqual({
            type: FETCH_USER_ACCOUNT_REQUEST
        })
    })

    it('should dispatch receiveAccountData if fetchUserAccounts succeeds', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_USER_ACCOUNT_REQUEST },
                                  { type: RECEIVE_USER_ACCOUNT_DATA, payload: fakePayload } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.fetchUserAccounts(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchUserAccounts fails', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_USER_ACCOUNT_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.fetchUserAccounts(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch receiveCertData correctly', ()=>{
        const fakeData= 'fakeData'
        expect(assigner.receiveCertData(fakeData)).toEqual({
            type: RECEIVE_USER_CERTIFIED_PROJECT_DATA,
            payload: fakeData
        })
    })

    it('should dispatch fetchCertsRequest correctly', ()=>{
        expect(assigner.fetchCertsRequest()).toEqual({
            type: FETCH_USER_CERTIFIED_PROJECT_REQUEST
        })
    })

    it('should dispatch receiveCertData if fetchCertifiedP succeeds', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_USER_CERTIFIED_PROJECT_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.fetchCertifiedP(fakeTokenData, 'hh')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchCertifiedP fails', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_USER_CERTIFIED_PROJECT_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.fetchCertifiedP(fakeTokenData, 'hh')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch postSubmissionRequest correctly', ()=>{
        expect(assigner.postSubmissionRequest()).toEqual({
            type: POST_USER_SUBMISSION_REQUEST
        })
    })

    it('should dispatch receiveCertData and hideNotification if postSubRequest succeeds', ()=>{
        resolvedAxiosPostSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: POST_USER_SUBMISSION_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.postSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if postSubRequest fails', ()=>{
        rejectedAxiosPostSetup()

        const expectedActions = [{
                                    type: POST_USER_SUBMISSION_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.postSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch deleteSubmissionRequest correctly', ()=>{
        expect(assigner.deleteSubmissionRequest()).toEqual({
            type: DELETE_USER_SUBMISSION_REQUEST
        })
    })

    it('should dispatch receiveCertData and hideNotification if deleteSubRequest succeeds', ()=>{
        resolvedAxiosPutSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: DELETE_USER_SUBMISSION_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.deleteSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if deleteSubRequest fails', ()=>{
        rejectedAxiosPutSetup()

        const expectedActions = [{
                                    type: DELETE_USER_SUBMISSION_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.deleteSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch updateSubmissionRequest correctly', ()=>{
        expect(assigner.updateSubmissionRequest()).toEqual({
            type: UPDATE_USER_SUBMISSION_REQUEST
        })
    })

    it('should dispatch receiveCertData and hideNotification if updateSubRequest succeeds', ()=>{
        resolvedAxiosPutSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: UPDATE_USER_SUBMISSION_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.updateSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if updateSubRequest fails', ()=>{
        rejectedAxiosPutSetup()

        const expectedActions = [{
                                    type: UPDATE_USER_SUBMISSION_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.updateSubRequest(fakeTokenData, 'hh', 'subreq')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch unassignSubmission correctly', ()=>{
        expect(assigner.unassignSubmission()).toEqual({
            type: UNASSIGN_USER_SUBMISSION
        })
    })

    it('should dispatch receiveCertData and hideNotification if unassignSub succeeds', ()=>{
        resolvedAxiosPostSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: UNASSIGN_USER_SUBMISSION },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.unassignSub(fakeTokenData, 'hh', 'subId')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if updateSubRequest fails', ()=>{
        rejectedAxiosPostSetup()

        const expectedActions = [{
                                    type: UNASSIGN_USER_SUBMISSION
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.unassignSub(fakeTokenData, 'hh', 'subId')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch startSimulation correctly', ()=>{
        expect(assigner.startSimulation()).toEqual({
            type: START_SIMULATION_REQUEST
        })
    })

    it('should dispatch stopSimulation correctly', ()=>{
        expect(assigner.stopSimulation()).toEqual({
            type: STOP_SIMULATION_REQUEST
        })
    })

    it('should dispatch receiveCertData and hideNotification if handleSimulation (STARTING simulation) succeeds', ()=>{
        resolvedAxiosPostSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: START_SIMULATION_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.handleSimulation(fakeTokenData, 'hh', 'projects', 'simulate')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch receiveCertData and hideNotification if handleSimulation (STOPPING simulation) succeeds', ()=>{
        resolvedAxiosPostSetup()
        window.setTimeout = (callback, timeout) => callback()

        const expectedActions = [ { type: STOP_SIMULATION_REQUEST },
                                  { type: RECEIVE_USER_CERTIFIED_PROJECT_DATA, payload: fakePayload},
                                  { type: HIDE_NOTIFICATION } ]

        const store = configMockStore()
        return(
            store.dispatch(assigner.handleSimulation(fakeTokenData, 'hh', 'projects', 'not_simulate')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if handleSimulation fails', ()=>{
        rejectedAxiosPostSetup()

        const expectedActions = [{
                                    type: START_SIMULATION_REQUEST
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(assigner.handleSimulation(fakeTokenData, 'hh', 'projects', 'simulate')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch fetchProjectFileRequest correctly', ()=>{
        expect(assigner.fetchProjectFileRequest()).toEqual({
            type: FETCH_PROJECT_FILE_REQUEST
        })
    })

    it('should dispatch receiveProjectFile correctly', ()=>{
        const fakeData='fakeData'
        expect(assigner.receiveProjectFile(fakeData)).toEqual({
            type: RECEIVE_PROJECT_FILE_DATA,
            payload: fakeData
        })
    })

    it('should return the project files if fetchProjectFiles succeeds', ()=>{
        resolvedAxiosGetSetup()
        
        return(
            assigner.fetchProjectFiles(fakeTokenData, 'accountId', 'subId', 'dir').then((response)=>{
                console.log('response: ', response)
                expect(response).toEqual(fakePayload)
            })
        )    
    })

    it('should return an error if fetchProjectFiles failes', ()=>{
        const statusText = 'Error occured'
        rejectedAxiosGetSetup(statusText)
        
        return(
            assigner.fetchProjectFiles(fakeTokenData, 'accountId', 'subId', 'dir').then((error)=>{
                expect(error).toEqual({status:401, statusText})
            })
        )    
    })

})

