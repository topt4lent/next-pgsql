import jwt from "jsonwebtoken";
import axios from "axios";
const secretKey = "createAGenericToken";
const fakeUser = {
  username: "t",
  password: "123",
};
const endpoint = "http://localhost:3000/api/login";

export const authenticate = async (credentials: {
  username: string;
  password: string;
}) => {
  const { username, password } = credentials;

  try {
    const response = await axios.post<any,any>(
      endpoint,
      JSON.stringify(credentials), // Send credentials as JSON string
      {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );
   // console.log(response.status);
 
    if (response.status === 200 ) {
      const accessToken = jwt.sign({ username: response.data.data.username }, secretKey, {
        expiresIn: "1h",
      });
      return {
        status: 202,
        token: accessToken,
        username: response.data.data.username,
      };
    } else if (response.status === 401) {
      
      return {
        status: 401,
        error: "invalid_password",
      };
    } else {
      return {
        status: 404,
        error: "invalid_user",
      };
    }
  } catch (error : any) {
    console.error("API Error:", error);
    if (error.response.status === 401) {
        return  { status: 401,
                  error: "unauthorized"}
    } else {
        return  { status: 401,
                  error: "invalid_user"}
    };
    
    //throw new Error("throw_error");

  }
};
