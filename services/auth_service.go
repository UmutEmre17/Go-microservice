package services

import (
	"errors"
	"strings"
	"golang.org/x/crypto/bcrypt"
	"sms-api-go/repositories"
	"sms-api-go/utils"
)

type authService struct{}

var AuthService = authService{}

func (s authService) Login(email, password string) (string, error) {
	user := repositories.UserRepo.FindByEmail(email)
	if user == nil {
		return "", errors.New("invalid email or password")
	}

	if !strings.HasPrefix(user.Password, "$2a$") {
		hashed, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
		user.Password = string(hashed)
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return "", errors.New("invalid email or password")
	}

	token, err := utils.GenerateToken(email)
	if err != nil {
		return "", err
	}

	return token, nil
}