class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authorize # check if session cookie includes user_id on every action (except where skipped)

  private

  def authorize
    render json: {errors: ["not authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  def render_unprocessable_entity_response(exception)
    render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: {errors: exception.record.errors.full_messages}, status: :not_found
  end

end