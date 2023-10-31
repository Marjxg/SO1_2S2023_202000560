FROM node:20.6.0

#Directorio en el contenedor donde se guardará el código
WORKDIR /app

#Copiar el package.json en el workdir
COPY package.json .
COPY package-lock.json .

#Obtener node_modules
RUN npm install

#Copiar el proyecto en el contenedor
COPY . .

#Crear el build
#RUN npm run build

EXPOSE 3000

#Proceso princial
CMD ["npm", "start"]

#Crear la imagen
#docker build -t sopes1-front-react .

#Crear el contenedor
#docker run -d -p 3000:3000 sopes1-front-react