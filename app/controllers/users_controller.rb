class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    skip_before_action :authorize, only: [:create]

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :image_url)
    end

    def not_found
        render json: { errors: ["User not found"] }, status: :not_found
    end
end
