import apiHandler from "../../../helpers/apiHandler";
import { createUser } from "../../../services/user.service";

export default apiHandler<{
  code: Number;
  data?: any;
  message?: string;
}>({
  POST: async (request, response) => {
    try {
      const { email, password } = JSON.parse(request.body);

      const user = await createUser({ email, password });

      response.status(201).json({
        code: 201,
        data: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({
        code: 400,
      });
    }
  },
});
