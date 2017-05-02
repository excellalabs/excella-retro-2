FROM node:6.10.2

RUN useradd --user-group --create-home --shell /bin/false app

ENV APP_NAME "excella-retro"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

RUN npm install --global @angular/cli@1.0.0

WORKDIR $APP_DIR
COPY package.json $APP_DIR/package.json
RUN npm install && npm cache clean
COPY . $APP_DIR
RUN chown -R $APP_USER:$APP_USER $HOME/*

USER $APP_USER
WORKDIR $APP_DIR

EXPOSE 4200