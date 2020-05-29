import React from 'react';
import * as log from '../../src/actions/log';
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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

describe('Logs Action Creators', ()=>{

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

    it('should fetchAllLogsData', ()=>{
        expect(log.fetchAllLogsData()).toEqual({
            type: FETCH_ALL_LOGS,
        })
    });

    it('should receiveAllLogs', ()=>{
        const data = 'fake Data'
                       
        expect(log.receiveAllLogs( data ))
        .toEqual({
            type: RECEIVE_ALL_LOGS,
            payload: data                
        })
    });

    
    it('should dispatch receiveAllLogs if fetchAllLogs succeeds', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_ALL_LOGS },
                                  { type: RECEIVE_ALL_LOGS, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchAllLogs(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchAllLogs fails', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_ALL_LOGS
                                }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchAllLogs(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    //std_err
    it('should dispatch receiveAllLogs if fetchThisLog succeeds for std_err', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_STD_ERR_LOG },
                                  { type: RECEIVE_STD_ERR_LOG, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'std_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchThisLog fails for std_err', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_STD_ERR_LOG
                                 }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'std_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    //udacity_err
    it('should dispatch receiveAllLogs if fetchThisLog succeeds for udacity_err', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_UDACITY_ERR_LOG },
                                  { type: RECEIVE_UDACITY_ERR_LOG, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'udacity_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchThisLog fails for udacity_err', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_UDACITY_ERR_LOG
                                 }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'udacity_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    //process_err
    it('should dispatch receiveAllLogs if fetchThisLog succeeds for process_err', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_PROCESS_ERR_LOG },
                                  { type: RECEIVE_PROCESS_ERR_LOG, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'process_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchThisLog fails for process_err', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_PROCESS_ERR_LOG
                                 }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData, 'process_err')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    //gunicorn error
    it('should dispatch receiveAllLogs if fetchThisLog succeeds for gunicorn error', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_GUNICORN_ERR_LOG },
                                  { type: RECEIVE_GUNICORN_ERR_LOG, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchThisLog fails for gunicorn error', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_GUNICORN_ERR_LOG
                                 }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchThisLog(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    //fetch all account codes tests
    it('should dispatch RECEIVE_ACCOUNT_CODES if fetchAccountCodes succeeds', ()=>{
        resolvedAxiosGetSetup()

        const expectedActions = [ { type: FETCH_ACCOUNT_CODES },
                                  { type: RECEIVE_ACCOUNT_CODES, payload: {result:fakePayload} } ]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchAccountCodes(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchAccountCodes fails', ()=>{
        rejectedAxiosGetSetup()

        const expectedActions = [{
                                    type: FETCH_ACCOUNT_CODES
                                 }, 
                                 {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(log.fetchAccountCodes(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

})

