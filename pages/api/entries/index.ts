import apiHandler from "../../../helpers/apiHandler";
import { getManyEntry } from "../../../services/entry.service";

export default apiHandler<{
  code: Number;
  data?: any;
}>({
  GET: async (request, response) => {
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
});
