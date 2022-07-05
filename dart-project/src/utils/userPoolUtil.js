import { CognitoUserPool } from "amazon-cognito-identity-js";

class UserPoolUtil {
  poolData = {
    UserPoolId: "ap-southeast-1_DVnAiOIBH",
    ClientId: "75dqnnfhng04ifc3l2rb9bfc8s",
  };

  getUserPoolData() {
    return this.poolData;
  }
}

export const userPoolUtil = new UserPoolUtil();
