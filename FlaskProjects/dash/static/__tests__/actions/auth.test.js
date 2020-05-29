import React from 'react';
import * as auth from '../../src/actions/auth';
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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

const fakePayload = 'fakePayload'

function configMockStore(){
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({})

    return store
}

describe('Authentication Action Creators', ()=>{
    beforeEach(()=>{
        const result={data:fakePayload}
        const promise = Promise.resolve(result)
        axios.get = jest.fn(url => promise)
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

    it('should loginUserSuccess', ()=>{
        expect(auth.loginUserSuccess('fake_token')).toEqual({
            type: LOGIN_USER_SUCCESS,
            payload: {
                token:'fake_token'
            },
        })
    });

    it('should loginUserFailure', ()=>{
        const fakeError = {response:{
                                status:404,
                                statusText:"fake status text"
                          }}
        expect(auth.loginUserFailure( fakeError ))
        .toEqual({
            type: LOGIN_USER_FAILURE,
            payload: {
                status: fakeError.response.status,
                statusText: fakeError.response.statusText,
            },
        })
    });

    it('should loginUserRequest', ()=>{
        expect(auth.loginUserRequest()).toEqual({
            type: LOGIN_USER_REQUEST
        })
    })

    it('should logout', ()=>{
        expect(auth.logout()).toEqual({
            type: LOGOUT_USER,
        })
    })

    it('should logoutAndRedirect with success', ()=>{
        const expectedActions = [ { type: 'LOGOUT_USER' }]

        const store = configMockStore()
        
        store.dispatch(auth.logoutAndRedirect())
        expect(store.getActions()).toEqual(expectedActions)
        
    })

    it('should dispatch loginUserSuccess if loginUser succeeds', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const result={data:{token:'fake_token'}}
        const promise = Promise.resolve(result)

        axios.post = jest.fn(url => promise)

        const expectedActions = [ { type: 'LOGIN_USER_REQUEST' },
                                  { type: 'LOGIN_USER_SUCCESS', payload: fakeTokenData } ]

        const store = configMockStore()
        return(
            store.dispatch(auth.loginUser('email', 'password', 'redirectTo')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch loginUserFailure if loginUser fails', ()=>{
        const result={status:401}
        const promise = Promise.reject(result)
        axios.post = jest.fn(url => promise)

        const expectedActions = [{
                                    type: LOGIN_USER_REQUEST
                                }, 
                                 {
                                    payload: {
                                            status: 403,
                                            statusText: "Invalid username or password"
                                    }, 
                                    type: LOGIN_USER_FAILURE
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.loginUser('email', 'password', 'redirectTo')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch registerUserRequest correctly', ()=>{
        expect(auth.registerUserRequest()).toEqual({
            type: REGISTER_USER_REQUEST,
        })
    })

    it('should dispatch registerUserSuccess correctly', ()=>{
        const fakeToken ="fake token"
        expect(auth.registerUserSuccess(fakeToken)).toEqual({
            type: REGISTER_USER_SUCCESS,
            payload: {
                token:fakeToken
            },
        })
    })

    it('should dispatch registerUserFailure correctly', ()=>{
        const fakeError = {response:{
                                status:404,
                                statusText:"fake status text"
                          }}
        expect(auth.registerUserFailure( fakeError ))
        .toEqual({
            type: REGISTER_USER_FAILURE,
            payload: {
                status: fakeError.response.status,
                statusText: fakeError.response.statusText,
            },
        })
    });

    it('should dispatch registerUserSuccess if registerUser succeeds', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const result={data:{token:'fake_token'}}
        const promise = Promise.resolve(result)

        axios.post = jest.fn(url => promise)

        const expectedActions = [ { type: 'REGISTER_USER_REQUEST' },
                                  { type: 'REGISTER_USER_SUCCESS', payload: fakeTokenData } ]

        const store = configMockStore()
        return(
            store.dispatch(auth.registerUser('email', 'password')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )       
    })

    it('should dispatch registerUserFailure if registerUser fails', ()=>{
        const result={status:401}
        const promise = Promise.reject(result)
        axios.post = jest.fn(url => promise)

        const expectedActions = [{
                                    type: REGISTER_USER_REQUEST
                                }, 
                                 {
                                    payload: {
                                            status: 403,
                                            statusText: 'User with that email already exists'
                                    }, 
                                    type: REGISTER_USER_FAILURE
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.registerUser('email', 'password')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch hideNotification correctly', ()=>{
        expect(auth.hideNotification()).toEqual({
            type: HIDE_NOTIFICATION
        })
    })

    it('should dispatch FETCH_USER_STATUS_SUCCESS if fetchUserStatus succeeds', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const response={result:'fake_result'}
        const promise = Promise.resolve({data:response})

        axios.get = jest.fn(url => promise)

        const expectedActions = [ { type: FETCH_USER_STATUS_REQUEST },
                                  { type: FETCH_USER_STATUS_SUCCESS, payload: response.result } ]

        const store = configMockStore()
        return(
            store.dispatch(auth.fetchUserStatus(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )       
    })

    it('should logoutAndRedirect if fetchUserStatus fails with status code 401', ()=>{
        const result={status:401}
        const promise = Promise.reject(result)
        axios.get = jest.fn(url => promise)

        const expectedActions = [{
                                    type: FETCH_USER_STATUS_REQUEST
                                }, 
                                 {
                                    type: LOGOUT_USER
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.fetchUserStatus('fakeToken')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch FETCH_USER_STATUS_FAILURE if fetchUserStatus fails with status code other than 401', ()=>{
        const fakePayload={status:403, statusText:'fancy status text'}
        const promise = Promise.reject({response:fakePayload})
        axios.get = jest.fn(url => promise)

        const expectedActions = [{
                                    type: FETCH_USER_STATUS_REQUEST
                                }, 
                                 {
                                    payload:fakePayload, 
                                    type: FETCH_USER_STATUS_FAILURE
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.fetchUserStatus()).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch SET_USER_STATUS_SUCCESS if setUserStatus succeeds', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const response={result:'fake_result'}
        const promise = Promise.resolve({data:response})

        axios.put = jest.fn(url => promise)

        const expectedActions = [ { type: SET_USER_STATUS_REQUEST },
                                  { type: SET_USER_STATUS_SUCCESS, payload: response.result } ]

        const store = configMockStore()
        return(
            store.dispatch(auth.setUserStatus(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )       
    })

    it('should logoutAndRedirect if setUserStatus fails with status code 401', ()=>{
        const result={status:401}
        const promise = Promise.reject(result)
        axios.put = jest.fn(url => promise)

        const expectedActions = [{
                                    type: SET_USER_STATUS_REQUEST
                                }, 
                                 {
                                    type: LOGOUT_USER
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.setUserStatus('fakeToken', 'status')).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch SET_USER_STATUS_REQUEST if setUserStatus fails with status code other than 401', ()=>{
        const fakePayload={status:403, statusText:'fancy status text'}
        const promise = Promise.reject({response:fakePayload})
        axios.put = jest.fn(url => promise)

        const expectedActions = [{
                                    type: SET_USER_STATUS_REQUEST
                                }, 
                                 {
                                    payload:fakePayload, 
                                    type: SET_USER_STATUS_FAILURE
                                }]

        const store = configMockStore()
        return(
            store.dispatch(auth.setUserStatus()).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })
})