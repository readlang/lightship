class TracksController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /tracks
    def index
        render json: Track.all, status: :ok
    end

    # get /tracks/:id
    def show
        render json: Track.find_by!(id: params[:id]), status: :ok
    end

    # get /users/:id/tracks
    def show_for_user
        render json: current_user.tracks, status: :ok
    end

    # get /groups/:id/tracks
    def show_for_group
        render json: Group.find_by!(id: params[:id]).tracks, status: :ok
    end

    # post /tracks
    def create
        render json: Track.create!(create_params), status: :created
    end

    # patch or put /tracks/:id
    def update
        track = Track.find_by!(id: params[:id])
        track.update!(edit_params)
        render json: track, status: :ok
    end

    # delete /tracks/:id
    def destroy
        track = Track.find_by!(id: params[:id])
        track.destroy
        render json: {deleted: track}, status: :ok
    end

    private

    def create_params
        params.permit(:user_id, :title, :activity, :minmax, :number, :unit, :interval, :notes, :group_id)
    end

    def edit_params
        params.permit(:title, :activity, :minmax, :number, :unit, :interval, :notes, :group_id)
    end

end
