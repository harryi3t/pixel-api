FROM harryi3t/node-forever:latest

ADD . /home/harry/pixel-api

RUN cd /home/harry/pixel-api && npm install
RUN chmod +x /home/harry/pixel-api/boot.sh

ENTRYPOINT ["/home/harry/pixel-api/boot.sh"]

EXPOSE 3000
