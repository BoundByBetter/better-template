# FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye
FROM cypress/browsers:node-20.12.2-chrome-124.0.6367.60-1-ff-125.0.1-edge-124.0.2478.51-1

# ---microsoft node-javascript image steps---
ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

RUN \
    # Configure global npm install location, use group to adapt to UID/GID changes
    if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
    # Install eslint
    && su ${USERNAME} -c "umask 0002 && npm install -g eslint" \
    && npm cache clean --force > /dev/null 2>&1

# --microsoft/typescript-node image steps--
ARG NODE_MODULES="tslint-to-eslint-config typescript"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# ---Install additional packages---
RUN apt-get update
RUN apt-get -y install xdg-utils
RUN npm install -g sharp-cli@^2.1.0
RUN npm install -g sharp-cli
RUN npm install -g n
RUN env "PATH=$PATH" 
RUN n lts
RUN n prune
RUN npm install -g npm@latest
RUN npm install -g eas-cli

# install java needed for android.
RUN cd /usr/lib
RUN wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb
RUN dpkg -i jdk-17_linux-x64_bin.deb

# Make android sdk directories.
RUN mkdir /home/node/Android
RUN mkdir /home/node/Android/Sdk

# Download the command line tools and install them.
RUN cd /home/node/Android/Sdk \
&& wget -O commandlinetools-linux.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip 

RUN mkdir /home/node/Android/Sdk/temp \
&& cd /home/node/Android/Sdk \
&& unzip commandlinetools-linux.zip -d ./temp \
&& mkdir cmdline-tools \
&& mkdir cmdline-tools/latest \
&& mv temp/cmdline-tools/* cmdline-tools/latest

ENV ANDROID_HOME /home/node/Android/Sdk
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

RUN yes | sdkmanager --licenses
RUN yes | sdkmanager "platform-tools" "platforms;android-34"
RUN yes | sdkmanager "build-tools;34.0.0"
RUN yes | sdkmanager "ndk-bundle" "ndk;25.1.8937393"
# RUN yes | sdkmanager "cmdline-tools;latest"
RUN yes | sdkmanager "build-tools;33.0.1"
RUN yes | sdkmanager "cmake;3.22.1"
RUN yes | sdkmanager "system-images;android-33;google_apis;x86_64"

# RUN yes | apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

RUN apt-get install watchman
ENV CI=false
ENV npm_config_loglevel=info

# used for web e2e testing.
RUN npx cypress install

RUN apt -y update
RUN apt -y upgrade

RUN apt install python3-pip -y

RUN pip3 install gmsaas

RUN npm install -g esbuild

RUN gmsaas config set android-sdk-path /home/node/Android/Sdk

# used for deploying the web site to netlify (hosting environment).
RUN npm install -g netlify-cli

# used for file watching.
RUN npm install -g nodemon

# used to get maestro.
RUN apt install curl -y
# used to run mobile e2e tests.
RUN curl -Ls "https://get.maestro.mobile.dev" | bash

# used in run-tests.sh script.
RUN apt-get install lsof

RUN yes | sdkmanager "emulator"

RUN echo "no" | avdmanager create avd -n test_avd -k "system-images;android-33;google_apis;x86_64" --device "pixel"

RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

RUN npm i -g azure-functions-core-tools@4 --unsafe-perm true
