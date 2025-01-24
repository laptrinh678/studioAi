FROM hub.vtcc.vn:8989/nginx:latest

ADD ./backend /var/www/html/utvm
COPY ./nginx.conf /etc/nginx/nginx.conf
ADD ./conf.d /etc/nginx/conf.d
COPY ./ssl/certs/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY ./ssl/private/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key
COPY ./ssl/certs/dhparam.pem /etc/ssl/certs/dhparam.pem
RUN ln -sr /var/www/html/utvm/storage/app/public /var/www/html/utvm/public/storage
