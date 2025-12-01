package models

import "time"

type SmsLog struct {
	ID uint `gorm:"primaryKey"`
	Phone string `gorm:"Size:20"`
	Message string `gorm:"type:text"`
	Status    string    `gorm:"size:20"`
	Provider  string    `gorm:"size:50"`
	MessageID string    `gorm:"size:100"`
	SentAt    time.Time
	CreatedAt time.Time

}