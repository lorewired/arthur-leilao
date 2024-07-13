import { createContext, useState } from "react";
import { AccountContextType, AccountDTO, AccountData, AccountProviderProps } from "../utils/interfaces";

const defaultContextValue: AccountContextType = {
    getAccount: async () => 500,
    loginAccount: async () => 500,
    signupAccount: async () => 500,
    logoutAccount: async () => {},
    account: undefined,
    setAccount: () => { },
};

export const AccountContext = createContext(defaultContextValue);

export const AccountProvider = ({ children }: AccountProviderProps) => {
    const [account, setAccount] = useState<AccountData | undefined>(undefined);
    
    const getAccount = async (): Promise<number> => {
        try {
            const response = await fetch("https://arthur-leilao-api-production.up.railway.app/api/account/auth", {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setAccount(data);
                return response.status;
            } else {
                console.error(`Authenticate error with status: ${response.status}`);
                return response.status;
            }
        } catch (e) {
            console.error("Error getting account: " + e);
            return 500;
        }
    }

    const loginAccount = async (accountDto: AccountDTO): Promise<number> => {
        try {
            const url = "https://arthur-leilao-api-production.up.railway.app/api/account/login";
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(accountDto),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            return response.status;
        } catch (e) {
            console.error("Error during login: ", e);
            return 500;
        }
    }

    const signupAccount = async (accountDto: AccountDTO): Promise<number> => {
        try {
            const url = "https://arthur-leilao-api-production.up.railway.app/api/account/signup";
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(accountDto),
                headers: { 'Content-Type': 'application/json' },
            });
            return response.status;
        } catch (e) {
            console.error("Error during register: ", e);
            return 500;
        }
    }

    const logoutAccount = async (): Promise<void> => {
        try {
            const url = "https://arthur-leilao-api-production.up.railway.app/api/account/logout";
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (response.ok) {
                setAccount(undefined);
            } else {
                console.error(`Logout failed with status: ${response.status}`);
            }
        } catch (e) {
            console.error("Error during register: ", e);
        }
    }

    const contextValue: AccountContextType = {
        getAccount,
        loginAccount,
        signupAccount,
        logoutAccount,
        account,
        setAccount
    };

    return <AccountContext.Provider value={contextValue} >
        {children}
    </AccountContext.Provider>
}