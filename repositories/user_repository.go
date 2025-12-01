package repositories

import (
	"sms-api-go/models"
	"sms-api-go/config"
)

type userRepository struct{}

var UserRepo = userRepository{}

func (r userRepository) FindByEmail(email string) *models.User {
	var user models.User

	result := config.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil
	}

	return &user
}

func (r userRepository) Create(user *models.User) error {
	return config.DB.Create(user).Error
}
