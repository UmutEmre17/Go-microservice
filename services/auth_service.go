package services

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"sms-api-go/repositories"
	"sms-api-go/utils"
	"sms-api-go/models"
)

type authService struct{}

var AuthService = authService{}

func (s authService) Login(email, password string) (string, error) {

	user := repositories.UserRepo.FindByEmail(email)
	if user == nil {
		return "", errors.New("invalid email or password")
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

func (s authService) Register(req models.RegisterRequest) error {

	existing := repositories.UserRepo.FindByEmail(req.Email)
	if existing != nil {
		return errors.New("email already exists")
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 12)

	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	return repositories.UserRepo.Create(&user)
}