package main

import (
	"sms-api-go/routes"
)

func main() {
	r := routes.SetupRouter()
	r.Run(":8000")
}
