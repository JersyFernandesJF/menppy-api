import { type FastifyReply, type FastifyRequest } from "fastify";
import { Controller } from "../classes/controller";
import { Http } from "../protocols/http";

export const fastifyRouteAdapter = (controller: Controller) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: Http.Request = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    console.log(reply.getResponseTime());
    const httpResponse = await controller.handle(httpRequest);

    console.log(
      "==>==> httpResponse",
      httpResponse,
      typeof httpResponse.statusCode.toString(),
      httpResponse.statusCode.toString().startsWith("2")
    );

    if (httpResponse.statusCode.toString().startsWith("2")) {
      await reply.status(httpResponse.statusCode).send(httpResponse.body);
    } else {
      console.log("==>==>", httpResponse.statusCode);
      await reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
  };
};
