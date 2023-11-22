class EventsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    skip_before_action :authorize, only: [:index]

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
        params.permit(:name, :details, :event_type, :image_url)
    end

    def not_found
        render json: { errors: ["Event not found"] }, status: :not_found
    end
end
