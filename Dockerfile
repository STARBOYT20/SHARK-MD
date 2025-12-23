<<<<<<< HEAD
FROM node:lts-buster
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/JawadTechX/DJ /home/node/DJ
WORKDIR /home/node/DJ
RUN chmod -R 777 /home/node/DJ/
RUN yarn install --network-concurrency 1
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
=======
FROM node:lts-buster
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/JawadTechX/DJ /home/node/DJ
WORKDIR /home/node/DJ
RUN chmod -R 777 /home/node/DJ/
RUN yarn install --network-concurrency 1
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
