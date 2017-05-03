FROM node:6.10.2

RUN useradd --user-group --create-home --shell /bin/false app

RUN npm install --global @angular/cli@1.0.0

WORKDIR /home/app/excella-retro
COPY package.json /home/app/excella-retro/package.json
RUN npm install && npm cache clean
COPY . /home/app/excella-retro
RUN chown -R app:app /home/app/*

USER app
WORKDIR /home/app/excella-retro

EXPOSE 4200