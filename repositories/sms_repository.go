package repositories

import (
	"sms-api-go/config"
	"sms-api-go/models"
)

type smsRepository struct {}

var SmsRepo = smsRepository{}

func (r smsRepository) Create(log *models.SmsLog) error {
	return config.DB.Create(log).Error
}