package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func main() {

	http.HandleFunc("/get_pid", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf(r.Method)
		if r.Method == http.MethodGet {
			fmt.Print(r.Body)
			var data map[string]interface{}
			err := json.NewDecoder(r.Body).Decode(&data)
			if err != nil {
				fmt.Printf("hay un error")
			}
			w.Header().Add("Access-Control-Allow-Origin", "*")
			w.Header().Add("Content-Type", "application/json")
			w.Write([]byte(`{"msg": "valor recibido"}`))
		}
	})

	//Emviar % de uso ram, cpu
	http.HandleFunc("/send_data", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {

			cmd := exec.Command("sh", "-c", "cat /proc/ram_202000560")
			out, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			output := string(out[:])
			fmt.Println(output)

			values := map[string]string{"ram": output, "cpu": "gardener"}
			body, err := json.Marshal(values)

			if err != nil {
				log.Fatal(err)
			}

			resp, err := http.Post("http://localhost:9000/api/modules", "application/json", bytes.NewBuffer(body))
			if err != nil {
				fmt.Println("Error al enviar información:", err)
				return
			}

			defer resp.Body.Close()

			fmt.Println("Respuesta del backend:", resp.Status)
		}
	})

	PORT := ":8080"
	fmt.Printf("Servidor Go escuchando en el puerto %s\n", PORT)
	http.ListenAndServe(PORT, nil)
}
