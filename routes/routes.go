package routes

import (
	"github.com/gin-gonic/gin"
	"sms-api-go/controllers"
	"sms-api-go/middlewares"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Basit health check
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Go API is working",
		})
	})

	// Public route
	r.POST("/login", controllers.Login)
	r.POST("/register", controllers.Register)

	// Protected routes
	authGroup := r.Group("/")
	authGroup.Use(middlewares.AuthMiddleware())
	{
		authGroup.POST("/send-sms", controllers.SendSms)
		authGroup.GET("/sms/logs", controllers.GetSmsLogs)
	}

	return r
}
