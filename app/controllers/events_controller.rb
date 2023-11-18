class EventsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def index
        events = Event.all
        render json: events
    end

    def show
        event = Event.find(params[:id])
        render json: event
    end

    def create
        event = Event.create!(event_params)
        render json: event, status: :created
    end

    private

    def event_params
        params.permit(:name, :details, :type, :image_url)
    end

    def record_invalid(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def not_found
        render json: { errors: ["Event not found"] }, status: :not_found
    end
end
