import React, { createContext } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./userPoolUtil";

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (!err) {
            resolve(session);
          } else {
            reject();
          }
        });
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (data) => {
          reject(data);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const leaveSession = () => {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        leaveSession,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
