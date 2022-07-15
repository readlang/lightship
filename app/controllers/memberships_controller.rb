class MembershipsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /things
    def index
        render json: Membership.all, status: :ok
    end

    # get /things/:id
    def show
        render json: Membership.find_by!(id: params[:id]), status: :ok
    end

    # post /things
    def create
        render json: Membership.create!(create_params), status: :created
    end

    # patch or put /things/:id
    def update
        membership = Membership.find_by!(id: params[:id])
        membership.update!(edit_params)
        render json: membership, status: :ok
    end

    # delete /things/:id
    def destroy
        membership = Membership.find_by!(id: params[:id])
        membership.destroy
        render json: {deleted: membership}, status: :ok
    end

    private

    def create_params
        params.permit(:user_id, :group_id)
    end

    def edit_params
        params.permit(:group_id)
    end

end
