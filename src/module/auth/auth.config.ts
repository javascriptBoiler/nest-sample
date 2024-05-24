export default {
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_CLIENT_ID,
  webClientId: process.env.COGNITO_WEB_CLIENT_ID,
  region: process.env.COGNITO_REGION,
  authority: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
};
