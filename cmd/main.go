package main

import (
	"sms-api-go/config"
	"sms-api-go/routes"
	"sms-api-go/models"
)

func main() {
	config.ConnectDB()

	config.DB.AutoMigrate(&models.User{})

	r := routes.SetupRouter()
	r.Run(":8000")
}
