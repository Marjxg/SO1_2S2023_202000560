from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

@app.route("/")
def index():
    return "Sí estoy funcionando!"

@app.route('/data', methods=['POST'])
def load():
    data = request.json

    # MYSQL
    mysql_client = mysql.connector.connect(
        host="34.73.179.70",
        port= 3306,
        user="admin",
        password="Admin123.",
        database= 'calificaciones'
    )
    mysql_cursor = mysql_client.cursor()

    # INSERT TO MYSQL
    instruction = "SELECT * FROM alumno WHERE carnet = %s"
    injection = (data['carnet'], )
    mysql_cursor.execute(instruction, injection)
    mysql_response = mysql_cursor.fetchall()
    if len(mysql_response) == 0:
        instruction = "INSERT INTO alumno (carnet, nombre) VALUES (%s, %s)"
        injection = (data['carnet'], data['nombre'])
        mysql_cursor.execute(instruction, injection)
        mysql_client.commit()
    instruction = 'INSERT INTO calificacion (nombre_curso, semestre, año, nota, carnet) VALUES (%s, %s, %s, %s, %s)'
    injection = (data['curso'], data['semestre'], data['year'], data['nota'], data['carnet'])
    mysql_cursor.execute(instruction, injection)
    mysql_client.commit()

    # FLASK
    return jsonify(response = {
        "status":"ok"
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)



#pip3 install flask flask_restful flask_sqlalchemy flask_migrate flask_marshmallow marshmallow-sqlalchemy
#pip3 install redis
#sudo systemctl stop redis 
#sudo systemctl restart redis-server
#python -m pip install mysql-connector-python