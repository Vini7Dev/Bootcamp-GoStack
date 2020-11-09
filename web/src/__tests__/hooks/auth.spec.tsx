import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from "@testing-library/react-hooks";
import api from '../../services/api';

import { AuthProvider, useAuth } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

describe('Auth - Hooks', () => {
    it('should be able to login', async () => {
        const responseData = {
            user: {
                id: 'id-1',
                name: 'Name',
                email: 'example@email.com'
            },
            token: 'token-123'
        }

        apiMock.onPost('sections').reply(200, responseData);

        const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        result.current.login({
            email: 'example@email.com',
            password: 'pass123'
        });

        await waitForNextUpdate();

        expect(localStorageSpy).toHaveBeenCalledWith('@GoBarber:token', responseData.token);
        expect(localStorageSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(responseData.user));
        expect(result.current.user.email).toEqual('example@email.com');
    });

    it('should restore saved data from storage when auth init', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
            switch(key) {
                case '@GoBarber:token':
                    return 'token-123';
                case '@GoBarber:user':
                    return JSON.stringify({
                        id: 'id-1',
                        name: 'Name',
                        email: 'example@email.com'
                    });
                default:
                    return null;
            }
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        expect(result.current.user.email).toEqual('example@email.com');
    });

    it('should be able to logout', async () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
            switch(key) {
                case '@GoBarber:token':
                    return 'token-123';
                case '@GoBarber:user':
                    return JSON.stringify({
                        id: 'id-1',
                        name: 'Name',
                        email: 'example@email.com'
                    });
                default:
                    return null;
            }
        });

        const localStorageSpy = jest.spyOn(Storage.prototype, 'removeItem');

        const { result,  } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        act(() => {
            result.current.logout();
        });

        expect(localStorageSpy).toHaveBeenCalledTimes(2);
        expect(result.current.user).toBeUndefined();
    });

    it('should be able to update user data', () => {
        const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        const userData = {
            id: 'id-1',
            email: 'newexample@email.com',
            name: 'New Name',
            avatar_url: 'url'
        };

        act(() => {
            result.current.updateUser(userData);
        });
    
        expect(localStorageSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(userData));
        expect(result.current.user.email).toEqual('newexample@email.com');
    });
});