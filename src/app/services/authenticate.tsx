import jwt from "jsonwebtoken";
const secretKey = "createAGenericToken";
const fakeUser = {
  username: "t",
  password: "123",
};

export const authenticate = async (credentials: {
  username: string;
  password: string;
}) => {
  const { username, password } = credentials;

  if (username === fakeUser.username && password === fakeUser.password) {
    const accessToken = jwt.sign({ username: username }, secretKey, {
      expiresIn: "1h",
    });
    return {
      status: 202,
      token: accessToken,
      username: fakeUser.username,
    };
  } else if (username === fakeUser.username && password !== fakeUser.password) {
    return {
      status: 404,
      error: "invalid_password",
    };
  } else {
    return {
      status: 404,
      error: "invalid_user",
    };
  }
};
