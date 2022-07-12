class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authorize # check if session cookie includes user_id on every action (except where skipped)

  private

  def authorize
    render json: {error: "not authorized"}, status: :unauthorized unless session.include? :user_id
  end
end