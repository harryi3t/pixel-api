FROM node:7.9.0

ADD . /home/harry/pixel-api

RUN cd /home/harry/pixel-api && npm install
RUN chmod +x /home/harry/pixel-api/boot.sh

RUN npm install -g forever

ENTRYPOINT ["/home/harry/pixel-api/boot.sh"]

EXPOSE 3000
