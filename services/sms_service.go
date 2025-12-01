package services

import (
	"time"
	"github.com/google/uuid"
	"sms-api-go/models"
	"sms-api-go/repositories"
)

type smsService struct{}

var SmsService = smsService{}

func (s smsService) Send(req models.SmsRequest) models.SmsResponse {
	response := models.SmsResponse{
		Status:    "success",
		Provider:  "MockSMS-Go",
		Phone:     req.Phone,
		Message:   req.Message,
		SentAt:    time.Now().Format(time.RFC3339),
		MessageID: uuid.New().String(),
	}

	log := models.SmsLog{
		Phone:     req.Phone,
		Message:   req.Message,
		Status:    response.Status,
		Provider:  response.Provider,
		MessageID: response.MessageID,
		SentAt:    time.Now(),
	}

	repositories.SmsRepo.Create(&log)

	return response
}