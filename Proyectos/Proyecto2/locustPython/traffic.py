import json
from random import randrange
from locust import HttpUser, between, task

debug = False

#Imprimir mensajes
def printDebug(msg):
    if debug:
        print(msg)

class Reader():
    #Constructor
    def __init__(self):
        self.array = []

    #Seleccionar registro al azar
    def pickRegistry(self):
        #Seleccionar un índice dentro del tamaño del array
        lenght = len(self.array)
        if (lenght > 0):
            random_index = randrange(0, lenght - 1) if lenght > 1 else 0
            return self.array.pop(random_index)
        else:
            print("There are no values in the file")
            return None
    
    #Cargar registros del archivo en el arreglo
    def load(self):
        print("Leyendo el archivo...")
        try:
            with open("traffic.json", "r") as data_file:
                self.array = json.loads(data_file.read())
        except Exception as error:
            print(f"No se cargaron los datos: {error}")

#Clase para leer el tráfico
class ScoresTraffic(HttpUser):
    wait_time = between(0.1, 0.9) #Tiempo en el que aparecerá un registro
    reader = Reader() #Instanciar clase
    reader.load() #Cargar datos

    def on_start(self):
        print("Enviando tráfico...")
    
    @task
    def postMessage(self):
        random_data = self.reader.pickRegistry()

        if(random_data is not None):
            data_to_send = json.dumps(random_data)
            printDebug(data_to_send)

            self.client.post("/", json=random_data)
        else:
            print("Finalizó el envío de tráfico.")
            self.stop(True)
        
    @task
    def getMessage(self):
        self.client.get("/")