package routes

import (
	"github.com/gin-gonic/gin"
	"sms-api-go/controllers"
	"sms-api-go/middlewares"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Basit health check
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Go API is working",
		})
	})

	// Public route
	r.POST("/login", controllers.Login)

	// Protected routes
	authGroup := r.Group("/")
	authGroup.Use(middlewares.AuthMiddleware())
	{
		authGroup.POST("/send-sms", controllers.SendSms)
	}

	return r
}
