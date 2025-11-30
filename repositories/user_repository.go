package repositories

import (
	"sms-api-go/models"
) 

type userRepo struct {
	users []models.User
}

var UserRepo = userRepo {
	users: []models.User{
		{
		Email: "test@example.com",
		Password: "password",
		Name: "Test User",
		},
	},
}

func (r userRepo) FindByEmail(email string) *models.User {
	for i := range r.users {
		if r.users[i].Email == email {
			return &r.users[i]
		}
	}
	return nil
}