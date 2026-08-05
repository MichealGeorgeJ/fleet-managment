import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { apiReference } from "@scalar/express-api-reference";
import { ENV } from "../../shared/constants/env.constant";
import { registry } from "./registry";
import "./index"

function generateOpenAPISpec() {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Fleet Management API",
            version: "1.0.0",
            description: "Fleet Management Backend API Documentation"            
        },
        servers: [
            { url: process.env.BASE_URL || `http://localhost:${ENV.PORT}` },
        ],
    });
}

export const swaggerUI = function () {
    return apiReference({
        content: generateOpenAPISpec(),
        theme: "purple",
        layout: "modern",
        darkMode: true,
        pageTitle: "Fleet Management API Docs",
        favicon:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS11bfBIbz0p139wWabd07TzT6Pd8NWtULdNMdC1E5lTA&s=10',
        defaultHttpClient: {
            targetKey: "js",
            clientKey: "fetch",
        },
    });
}