package main

import (
	"fmt"
	"os"
	"os/exec"
	"time"
)

func main() {
	filePath := "/proc/ram_202000560"
	cmd := exec.Command("cat", filePath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		fmt.Printf("Error al ejecutar el comando: %s\n", err)
	}

	time.Sleep(time.Second * 100)
}
