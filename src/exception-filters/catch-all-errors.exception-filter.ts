import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CatchAllErrorsExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // Pegando o contexto da requisição
        const response = ctx.getResponse(); // Pegando a resposta da requisição

        return response.status(422).json({
            statusCode: 422, //400
            message: exception.message,
        })
    }
}