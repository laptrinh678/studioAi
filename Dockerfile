FROM hub.vtcc.vn:8989/nginx:stable-perl

ARG DEBIAN_FRONTEND=noninteractive
ENV http_proxy http://proxy.cyberspace.vn:3128
ENV https_proxy http://proxy.cyberspace.vn:3128

RUN apt -y update && \
    apt install -y php8.2 php8.2-fpm php8.2-cli php8.2-curl php8.2-mysql php8.2-gd php8.2-mbstring php8.2-zip php-pear && \
    apt install -y php-mongodb curl

RUN apt install telnet -y && \
    apt install vim -y

RUN apt install curl -y && \
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && \
    /bin/bash -c "source ~/.bashrc && nvm install 18"

COPY stable.conf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/nginx.conf

# Configure PHP-FPM
COPY www.conf /etc/php/8.2/fpm/pool.d/www.conf

COPY php.ini /etc/php/8.2/fpm/php.ini
COPY src /var/www/html/stable

WORKDIR /workspace

COPY run.sh run.sh

ENV http_proxy=
ENV https_proxy=

ENTRYPOINT ["/bin/bash"]
CMD ["run.sh"]
