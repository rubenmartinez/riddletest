FROM nginx:stable

EXPOSE 4242

COPY * /usr/share/nginx/html/
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

ENV GRANTED_FILES /var /var/cache/nginx /var/log/nginx /var/run
RUN mkdir -p $GRANTED_FILES
RUN chgrp -R 0 $GRANTED_FILES && chmod -R g+rwX $GRANTED_FILES

