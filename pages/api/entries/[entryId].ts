import { unstable_getServerSession } from "next-auth";
import apiHandler from "../../../helpers/apiHandler";
import {
  deleteEntry,
  getOneEntry,
  updateEntry,
} from "../../../services/entry.service";

export default apiHandler<{
  code: Number;
  data?: any;
  message?: string;
}>({
  GET: async (request, response) => {
    const session = await unstable_getServerSession(request, response, {});

    if (!session?.user?.email) throw new Error();

    const { id } = request.query as {
      id: string;
    };

    try {
      const entry = await getOneEntry({
        id: Number.parseInt(id),
      });

      return response.send({
        code: 200,
        data: entry,
      });
    } catch (error) {
      console.error(error);
      return response.send({
        code: 500,
      });
    }
  },
  PATCH: async (request, response) => {
    const session = await unstable_getServerSession(request, response, {});

    if (!session?.user?.email) throw new Error();

    const { id } = request.query as {
      id: string;
    };
    const { content, mood } = JSON.parse(request.body);

    try {
      const entry = await updateEntry(
        {
          id: Number.parseInt(id),
        },
        {
          content,
          mood,
        }
      );

      return response.send({
        code: 200,
        data: entry,
      });
    } catch (error) {
      console.error(error);
      return response.send({
        code: 500,
      });
    }
  },
  DELETE: async (request, response) => {
    const session = await unstable_getServerSession(request, response, {});

    if (!session?.user?.email) throw new Error();

    const { entryId } = request.query as {
      entryId: string;
    };

    try {
      await deleteEntry({
        id: Number.parseInt(entryId),
      });

      return response.send({
        code: 200,
      });
    } catch (error) {
      console.error(error);
      return response.send({
        code: 500,
      });
    }
  },
});
