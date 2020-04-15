FROM debian:latest

COPY . /stockapp

WORKDIR stockapp

RUN apt-get update && \
		apt-get -y install curl gnupg && \
		curl -sL https://deb.nodesource.com/setup_10.x | bash && \
		apt-get install nodejs -y && \
		npm install && \
		node index
