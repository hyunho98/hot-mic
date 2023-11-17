class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def create
        user = User.find(session[:user_id])
        review = user.reviews.create!(review_params)
        render json: review, status: :created
    end

    def index
        reviews = Review.all
        render json: reviews
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def update
        user = User.find(session[:user_id])
        review = user.reviews.find(params[:id])
        review.update!(review_params)
        render json: review
    end

    def destroy
        user = User.find(session[:user_id])
        review = user.reviews.find(params[:id])
        review.destroy
        head :no_content
    end


    private

    def review_params
        params.permit(:title, :content, :likes, :dislikes, :event_id)
    end

    def record_invalid(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def not_found
        render json: { errors: ["Review not found"] }, status: :not_found
    end
end
