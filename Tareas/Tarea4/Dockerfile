FROM golang

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY *go ./

RUN go build -o /api

EXPOSE 8080

CMD [ "/api" ]