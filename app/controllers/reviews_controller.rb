class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        user = User.find(session[:user_id])
        if user.reviews.any? {|review| review['event_id'] == review_params['event_id']}
            render json: { errors: ["You already have a review for this event"] }, status: :bad_request
        else
            review = user.reviews.create!(review_params)
            render json: review, status: :created
        end
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
        params.permit(:title, :content, :event_id)
    end

    def not_found
        render json: { errors: ["Review not found"] }, status: :not_found
    end
end
