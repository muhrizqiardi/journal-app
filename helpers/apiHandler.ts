import { NextApiHandler } from "next";

type ApiHandler = <T = any>(handlers: {
  GET?: NextApiHandler<T>;
  POST?: NextApiHandler<T>;
  PUT?: NextApiHandler<T>;
  PATCH?: NextApiHandler<T>;
  DELETE?: NextApiHandler<T>;
  defaultHandler?: NextApiHandler<T>;
}) => NextApiHandler<T>;

const apiHandler: ApiHandler = (handlers) => (request, response) => {
  const method = request.method;

  switch (method) {
    case "GET":
      if (handlers.GET) handlers.GET(request, response);
      break;

    case "POST":
      if (handlers.POST) handlers.POST(request, response);
      break;

    case "PUT":
      if (handlers.PUT) handlers.PUT(request, response);
      break;

    case "PATCH":
      if (handlers.PATCH) handlers.PATCH(request, response);
      break;

    case "DELETE":
      if (handlers.DELETE) handlers.DELETE(request, response);
      break;

    default:
      if (handlers.defaultHandler) handlers.defaultHandler(request, response);
      break;
  }
};

export default apiHandler;
