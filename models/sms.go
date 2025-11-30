package models

type SmsRequest struct {
	Phone   string `json:"phone" binding:"required"`
	Message string `json:"message" binding:"required"`
}

type SmsResponse struct {
	Status    string `json:"status"`
	Provider  string `json:"provider"`
	Phone     string `json:"phone"`
	Message   string `json:"message"`
	SentAt    string `json:"sent_at"`
	MessageID string `json:"message_id"`
}
