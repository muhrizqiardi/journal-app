import { Entry } from "@prisma/client";
import { NextApiHandler } from "next";
import apiHandler from "../../../helpers/apiHandler";
import { deleteEntry, getOneEntry, updateEntry } from "../../../services/entry.service";

export default apiHandler<{
  code: Number;
  data?: any;
}>({
  GET: async (request, response) => {
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
      return response.send({
        code: 500,
      });
    }
  },
  PATCH: async (request, response) => { 
    const { id } = request.query as {
      id: string;
    };
    const { content, mood } = request.body;

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
      return response.send({
        code: 500,
      });
    }
  },
  DELETE: async (request, response) => {
    const { id } = request.query as {
      id: string;
    };

    try {
      await deleteEntry({
        id: Number.parseInt(id),
      });

      return response.send({
        code: 200,
      });
    } catch (error) {
      return response.send({
        code: 500,
      });
    }
  }
});
