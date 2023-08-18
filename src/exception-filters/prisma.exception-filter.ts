import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError) // Para saber que tipo de erro é esse que o prisma retorna.
export class PrismaExceptionFilter implements ExceptionFilter {

    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // Pegando o contexto da requisição
        const response = ctx.getResponse(); // Pegando a resposta da requisição

        if (exception.code === 'P2025') {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message,
            });
        }

        return response.status(500).json({
            statusCode: 500,
            message: "Internal server error",
        });
    }
}