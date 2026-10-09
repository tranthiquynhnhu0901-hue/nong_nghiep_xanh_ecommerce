FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node . /app/
RUN mkdir -p /app/storage && chown -R node:node /app/storage
USER node
EXPOSE 3000
ENV NODE_ENV=production PORT=3000 DATA_DIR=/app/storage
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["npm", "start"]
