import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-1_DVnAiOIBH",
  ClientId: "75dqnnfhng04ifc3l2rb9bfc8s",
};

export default new CognitoUserPool(poolData);
