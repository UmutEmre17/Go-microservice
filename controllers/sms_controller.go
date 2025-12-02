package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"sms-api-go/models"
	"sms-api-go/config"
	"sms-api-go/services"
)

// SendSms godoc
// @Summary Send SMS
// @Description Sends an SMS and logs it to the database
// @Tags SMS
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer Token"
// @Param request body models.SmsRequest true "SMS data"
// @Success 200 {object} models.SmsResponse
// @Failure 400 {object} map[string]string
// @Router /send-sms [post]
func SendSms(c *gin.Context) {
	var body models.SmsRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := services.SmsService.Send(body)
	c.JSON(http.StatusOK, result)
}

func GetSmsLogs(c *gin.Context) {
	var logs []models.SmsLog
	result := config.DB.Order("created_at DESC").Find(&logs)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch logs"})
		return
	}

	c.JSON(http.StatusOK, logs)
}