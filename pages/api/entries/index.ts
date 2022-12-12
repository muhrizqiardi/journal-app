import { unstable_getServerSession } from "next-auth";
import apiHandler from "../../../helpers/apiHandler";
import { createEntry, getManyEntry } from "../../../services/entry.service";

export default apiHandler<{
  code: Number;
  data?: any;
  message?: string;
}>({
  GET: async (request, response) => {
    const session = await unstable_getServerSession(request, response, {});

    if (!session?.user?.email) throw new Error();

    const {
      content,
      mood,
      createdBefore,
      createdAt,
      createdAfter,
      page = "1",
      limit = "10",
    } = request.query as {
      content: string;
      mood: string;
      createdBefore: string;
      createdAt: string;
      createdAfter: string;
      page: string;
      limit: string;
    };

    try {
      const entries = await getManyEntry({
        content,
        mood: Number.parseInt(mood),
        createdBefore,
        createdAt,
        createdAfter,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        userEmail: session.user.email,
      });

      return response.send({
        code: 200,
        data: entries,
      });
    } catch (error) {
      console.error(error);
      return response.send({
        code: 500,
      });
    }
  },
  POST: async (request, response) => {
    try {
      const session = await unstable_getServerSession(request, response, {});

      if (!session?.user?.email) throw new Error();

      const { content, mood } = JSON.parse(request.body) as {
        content: string;
        mood: number;
      };

      const entry = await createEntry({
        content,
        mood,
        userEmail: session.user.email,
      });

      return response.status(201).send({
        code: 201,
        data: entry,
      });
    } catch (error) {
      console.error(error);
      return response.status(401).json({ code: 401, message: "Unauthorized" });
    }
  },
});
