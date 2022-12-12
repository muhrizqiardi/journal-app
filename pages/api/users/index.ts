import apiHandler from "../../../helpers/apiHandler";
import { createUser } from "../../../services/user.service";

export default apiHandler<{
  code: number;
  data?: any;
}>({
  POST: async (request, response) => {
    try {
      const { email, password } = request.body;

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
      response.status(400).json({
        code: 400,
      });
    }
  },
});
