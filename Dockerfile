FROM node:8.10.0-slim

COPY . /stockapp

WORKDIR stockapp

RUN npm install && \
		node index
