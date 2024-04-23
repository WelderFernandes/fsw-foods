# Base image
FROM postgres:14

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=my-password
ENV POSTGRES_DB=my-database

# Create the database user and database
RUN set -ex; \
    POSTGRES_USER=${POSTGRES_USER} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    POSTGRES_DB=${POSTGRES_DB} \
    gosu postgres postgres --single -c "CREATE USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';" && \
    gosu postgres postgres --single -c "CREATE DATABASE \"$POSTGRES_DB\" OWNER \"$POSTGRES_USER\";"

# Expose the PostgreSQL port
EXPOSE 5432
