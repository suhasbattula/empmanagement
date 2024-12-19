FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Set npm registry and increase timeout
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --timeout=600000 --no-optional

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
