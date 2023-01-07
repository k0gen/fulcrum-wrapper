FROM debian:bullseye as builder

LABEL maintainer.0="Axel Gembe <derago@gmail.com>" \
  maintainer.1="Chris Guida (@chrisguida@gmail.com)"

ARG MAKEFLAGS

RUN apt update -y && \
    apt install -y openssl git build-essential pkg-config zlib1g-dev libbz2-dev libjemalloc-dev libzmq3-dev qtbase5-dev qt5-qmake

WORKDIR /src

COPY ./Fulcrum .

RUN qmake -makefile PREFIX=/usr Fulcrum.pro && \
    make $MAKEFLAGS install

RUN strip Fulcrum

FROM debian:bullseye-slim

RUN apt update && \
    apt install -y openssl libqt5network5 zlib1g libbz2-1.0 libjemalloc2 libzmq5 tini wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=builder /src/Fulcrum /usr/bin/Fulcrum

VOLUME ["/data"]
ENV DATA_DIR /data

ENV SSL_CERTFILE ${DATA_DIR}/fulcrum.crt
ENV SSL_KEYFILE ${DATA_DIR}/fulcrum.key

EXPOSE 50001 50002

ARG PLATFORM
ARG ARCH
RUN wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_${PLATFORM} && chmod +x /usr/local/bin/yq
ADD ./configurator/target/${ARCH}-unknown-linux-musl/release/configurator /usr/local/bin/configurator
COPY ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]

# CMD ["Fulcrum"]
