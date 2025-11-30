package services

import (
	"time"
	"github.com/google/uuid"
	"sms-api-go/models"
)

type smsService struct{}

var SmsService = smsService{}

func (s smsService) Send(req models.SmsRequest) models.SmsResponse {
	return models.SmsResponse{
		Status:    "success",
		Provider:  "MockSMS-Go",
		Phone:     req.Phone,
		Message:   req.Message,
		SentAt:    time.Now().Format(time.RFC3339),
		MessageID: uuid.New().String(),
	}
}