class ActionsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /things
    def index
        render json: Action.all, status: :ok
    end

    # get /things/:id
    def show
        render json: Action.find_by!(id: params[:id]), status: :ok
    end

    # get /tracks/:id/actions
    def show_for_track
        render json: Track.find_by!(id: params[:id]).actions, status: :ok
    end

    # post /things
    def create
        render json: Action.create!(create_params), status: :created
    end

    # patch or put /things/:id
    def update
        action = Action.find_by!(id: params[:id])
        action.update!(edit_params)
        render json: action, status: :ok
    end

    # delete /things/:id
    def destroy
        action = Action.find_by!(id: params[:id])
        action.destroy
        render json: {deleted: action}, status: :ok
    end

    private

    def create_params
        params.permit(:track_id, :date_time, :number, :difficulty, :comment)
    end

    def edit_params
        params.permit(:date_time, :number, :difficulty, :comment)
    end

end
