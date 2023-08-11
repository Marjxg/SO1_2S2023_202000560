package main

import (
	"encoding/json"
	"net/http"
)

type Estudiante struct {
	Carnet string `json:"carnet"`
	Name   string `json:"name"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	// Supongamos que tienes los datos del estudiante en alguna estructura o base de datos
	estudiante := Estudiante{
		Carnet: "202000560",
		Name:   "Marjorie Gissell Reyes Franco",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(estudiante)
}

func main() {
	http.HandleFunc("/data", Handler)
	http.ListenAndServe(":8080", nil)
}
