class MembershipsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /memberships
    def index
        render json: Membership.all, status: :ok
    end

    # get /memberships/:id
    def show
        render json: Membership.find_by!(id: params[:id]), status: :ok
    end

    # get /groups/:id/memberships
    def show_for_group
        render json: Group.find_by!(id: params[:id]).memberships, status: :ok
    end

    # post /memberships
    def create
        render json: Membership.create!(create_params), status: :created
    end

    # patch or put /memberships/:id
    def update
        membership = Membership.find_by!(id: params[:id])
        membership.update!(edit_params)
        render json: membership, status: :ok
    end

    # delete /memberships/:id
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
