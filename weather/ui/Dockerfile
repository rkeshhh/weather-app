FROM node:18

# Set env for OpenSSL compatibility (required for Node 17+)
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 4200

CMD ["npm", "start"]
