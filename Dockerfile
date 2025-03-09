FROM node:22.14.0-alpine

WORKDIR /app

EXPOSE 5173

CMD ["npm", "run", "dev"] 