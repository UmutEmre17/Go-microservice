package main

import (
	"sms-api-go/config"
	"sms-api-go/routes"
	"sms-api-go/models"
	docs "sms-api-go/docs"
    ginSwagger "github.com/swaggo/gin-swagger"
    swaggerFiles "github.com/swaggo/files"
)

func main() {
	config.ConnectDB()
	config.DB.AutoMigrate(&models.User{}, &models.SmsLog{})

	docs.SwaggerInfo.Title = "SMS API Service"
	docs.SwaggerInfo.Description = "Go + Gin + MySQL + JWT Authentication SMS API"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:8000"
	docs.SwaggerInfo.BasePath = "/"

	r := routes.SetupRouter()

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	
	r.Run(":8000")
}
