class TracksController < ApplicationController

    # get /things
    def index
        render json: Track.all, status: :ok
    end

    # get /things/:id
    def show
        render json: Track.find_by!(id: params[:id]), status: :ok
    end

    # post /things
    def create
        render json: Track.create!(track_params), status: :created
    end

    # patch or put /things/:id
    def update
        track = Track.find_by!(id: params[:id])
        track.update!(edit_params)
        render json: track, status: :ok
    end

    # delete /things/:id
    def destroy
        track = Track.find_by!(id: params[:id])
        track.destroy
        render json: {deleted: track}, status: :ok
    end

    private

    def track_params
        params.permit(:user_id, :title, :activity, :minmax, :number, :unit, :interval, :notes, :group_id)
    end

    def edit_params
        params.permit(:title, :activity, :minmax, :number, :unit, :interval, :notes, :group_id)
    end

end
