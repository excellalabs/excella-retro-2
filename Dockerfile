FROM node:6.10.2

RUN useradd --user-group --create-home --shell /bin/false app

RUN npm install --global @angular/cli@1.0.0

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --quiet
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app
COPY ./ /usr/app/

EXPOSE 4200

CMD ng build