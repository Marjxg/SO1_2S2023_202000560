FROM python:3.7

RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN pip install -r requirements.txt
RUN python -m pip install mysql-connector-python

EXPOSE 5000
CMD ["python", "/app/main.py"]
#docker build -f Dockerfile -t hello-python:latest .