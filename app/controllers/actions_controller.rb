class ActionsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /actions
    def index
        render json: Action.all, status: :ok
    end

    # get /actions/:id
    def show
        render json: Action.find_by!(id: params[:id]), status: :ok
    end

    # get /tracks/:id/actions
    def show_for_track
        render json: Track.find_by!(id: params[:id]).actions_sorted, status: :ok
    end

    # get /groups/:id/actions
    def show_for_group
        render json: Group.find_by!(id: params[:id]).actions_sorted, status: :ok
    end

    # post /actions
    def create
        render json: Action.create!(create_params), status: :created
    end

    # patch or put /actions/:id
    def update
        action = Action.find_by!(id: params[:id])
        action.update!(edit_params)
        render json: action, status: :ok
    end

    # delete /actions/:id
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
