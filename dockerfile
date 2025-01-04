FROM node:22

WORKDIR /home/build/fullstack
COPY . .

RUN npm i -g bun@latest
RUN npm i -g pm2@latest

# ARG arg_pm2_pk 
# ARG arg_pm2_sk
# ENV PM2_PUBLIC_KEY=${arg_pm2_pk}
# ENV PM2_SECRET_KEY=${arg_pm2_sk}

RUN npm i 

EXPOSE 3443 4173

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]