package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sms-api-go/models"
	"sms-api-go/services"
)

func SendSms(c *gin.Context) {
	var body models.SmsRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := services.SmsService.Send(body)
	c.JSON(http.StatusOK, result)
}
