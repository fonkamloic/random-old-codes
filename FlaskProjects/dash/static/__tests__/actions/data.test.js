import React from 'react';
import * as data from '../../src/actions/data';
import {get_token, create_user, fetch_user_status, set_user_status} from  '../../src/utils/http_functions'
import { parseJSON } from '../../src/utils/misc';
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { 
        FETCH_PROTECTED_DATA_REQUEST, 
        RECEIVE_PROTECTED_DATA 
} from "../../src/constants";

const fakePayload = 'fakePayload'

function configMockStore(){
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({})

    return store
}

describe('Protected Data Action Creators', ()=>{
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

    it('should receiveProtectedData', ()=>{
        const fakeData={
            data: 'fake_protected_data'
        }
        expect(data.receiveProtectedData(fakeData)).toEqual({
            type: RECEIVE_PROTECTED_DATA,
            payload: {
                data:fakeData,
            }
        })
    });

    it('should fetchProtectedDataRequest', ()=>{
        expect(data.fetchProtectedDataRequest())
        .toEqual({
            type: FETCH_PROTECTED_DATA_REQUEST
        })
    });

    it('should dispatch receiveProtectedData if fetchProtectedData succeeds', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const response={data:{result:'fake_result'}}
        const promise = Promise.resolve(response)
        
        axios.get = jest.fn(url => promise)

        const expectedActions = [ { type: FETCH_PROTECTED_DATA_REQUEST },
                                  { type: RECEIVE_PROTECTED_DATA, payload: {data:response.data.result} } ]

        const store = configMockStore()
        return(
            store.dispatch(data.fetchProtectedData(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })

    it('should dispatch logoutAndRedirect if fetchProtectedData fails', ()=>{
        const fakeTokenData = {token:'fake_token'}
        const result={status:401}
        const promise = Promise.reject(result)
        axios.get = jest.fn(url => promise)

        const expectedActions = [{
                                    type: FETCH_PROTECTED_DATA_REQUEST
                                }, {
                                    type: 'LOGOUT_USER'
                                }]

        const store = configMockStore()
        return(
            store.dispatch(data.fetchProtectedData(fakeTokenData)).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
        )    
    })
})