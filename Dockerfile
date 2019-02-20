FROM nginx:alpine

COPY public /home/bluezinc/apps/tm3-website
COPY nginx.conf /etc/nginx/
