FROM node:0.10
MAINTAINER Zeke Nierenberg hampzan09@gmail.com
RUN mkdir /Development
RUN mkdir /debugger-client
RUN cd /debugger-client && npm i ws
COPY ../websocket-debugger-client/client.js /debugger-client/client.js 
COPY ../websocket-debugger-client/demo.js /debugger-client/demo.js 

EXPOSE 9229