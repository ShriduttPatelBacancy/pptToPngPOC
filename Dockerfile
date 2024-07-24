# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY src/ src/

# Install required dependencies for running the application
RUN apt-get update && \
    apt-get install -y \
    libreoffice-dev \
    imagemagick \
    ghostscript \
    poppler-utils && \
    sed -i '/<policy domain="coder" rights="none" pattern="PS" \/>/d' /etc/ImageMagick-6/policy.xml && \
    sed -i '/<policy domain="coder" rights="none" pattern="PS2" \/>/d' /etc/ImageMagick-6/policy.xml && \
    sed -i '/<policy domain="coder" rights="none" pattern="PS3" \/>/d' /etc/ImageMagick-6/policy.xml && \
    sed -i '/<policy domain="coder" rights="none" pattern="EPS" \/>/d' /etc/ImageMagick-6/policy.xml && \
    sed -i '/<policy domain="coder" rights="none" pattern="PDF" \/>/d' /etc/ImageMagick-6/policy.xml && \
    sed -i '/<policy domain="coder" rights="none" pattern="XPS" \/>/d' /etc/ImageMagick-6/policy.xml

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "server" ]