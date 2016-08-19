FROM node:latest
MAINTAINER Zeke Nierenberg hampzan09@gmail.com
RUN mkdir /Development
RUN mkdir /debugger-client
RUN mkdir -p /tmp/return_files
RUN cd /debugger-client && npm i ws
RUN cd /Development && npm i async-await-presentation-strawpeople@1.0.1
COPY client.js /debugger-client/client.js 
COPY demo.js /debugger-client/demo.js 
COPY writer.js /debugger-client/writer.js 