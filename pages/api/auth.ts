import apiHandler from "../../helpers/apiHandler";
import { createToken, verifyToken } from "../../services/auth.service";

export default apiHandler({
  POST: async (request, response) => {
    try {
      const { email, password } = request.body;

      const token = await createToken({ email, password });

      response.status(201).json({
        code: 201,
        data: {
          token,
        },
      });
    } catch (error) {
      response.status(400).json({
        code: 400,
      });
    }
  },
  GET: async (request, response) => {
    const { authorization } = request.headers;
    try {
      if (authorization === undefined) throw new Error("Token is required");

      const token = authorization.split(" ")[1];
      const tokenIsValid = Boolean(verifyToken(token));

      if (!tokenIsValid) throw new Error("Token is invalid");

      response.status(200).json({
        code: 200,
        data: token,
      });
    } catch (error) {
      throw error;
    }
  },
});
