FROM node:latest
MAINTAINER Zeke Nierenberg hampzan09@gmail.com
RUN mkdir /Development
RUN mkdir /debugger-client
RUN cd /debugger-client && npm i ws
COPY client.js /debugger-client/client.js 
COPY demo.js /debugger-client/demo.js 

EXPOSE 9229