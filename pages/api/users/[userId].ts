import { unstable_getServerSession } from "next-auth";
import apiHandler from "../../../helpers/apiHandler";
import {
  deleteUser,
  getOneUser,
  updateUser,
} from "../../../services/user.service";

export default apiHandler<{
  code: Number;
  data?: any;
  message?: string;
}>({
  GET: async (request, response) => {
    const session = await unstable_getServerSession(request);

    if (!session)
      return response.status(401).json({ code: 401, message: "Unauthorized" });

    const { userId } = request.query as { userId: string };
    try {
      if (userId === undefined) throw new Error("User id is required");

      const user = await getOneUser({
        id: Number.parseInt(userId),
      });

      response.status(200).json({
        code: 200,
        data: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "User id is required")
          response.status(400).json({
            code: 400,
          });

        response.status(500).json({
          code: 500,
        });
      }
    }
  },
  PATCH: async (request, response) => {
    const session = await unstable_getServerSession(request);

    if (!session)
      return response.status(401).json({ code: 401, message: "Unauthorized" });

    const { userId } = request.query as { userId: string };
    const { email, password } = JSON.parse(request.body);

    try {
      if (userId === undefined) throw new Error("User id is required");

      const user = await updateUser(
        {
          id: Number.parseInt(userId),
        },
        {
          email,
          password,
        }
      );

      response.status(200).json({
        code: 200,
        data: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "User id is required")
          response.status(400).json({
            code: 400,
          });

        response.status(500).json({
          code: 500,
        });
      }
    }
  },
  DELETE: async (request, response) => {
    const session = await unstable_getServerSession(request);

    if (!session)
      return response.status(401).json({ code: 401, message: "Unauthorized" });

    const { userId } = request.query as { userId: string };

    try {
      if (userId === undefined) throw new Error("User id is required");

      await deleteUser({ id: Number.parseInt(userId) });

      response.status(200).json({
        code: 200,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "User id is required")
          response.status(400).json({
            code: 400,
          });

        response.status(500).json({
          code: 500,
        });
      }
    }
  },
});
