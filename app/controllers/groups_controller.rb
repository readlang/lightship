class GroupsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /things
    def index
        render json: Group.all, status: :ok
    end

    # get /things/:id
    def show
        render json: Group.find_by!(id: params[:id]), status: :ok
    end

    # post /things
    def create
        render json: Group.create!(create_params), status: :created
    end

    # patch or put /things/:id
    def update
        group = Group.find_by!(id: params[:id])
        group.update!(edit_params)
        render json: group, status: :ok
    end

    # delete /things/:id
    def destroy
        group = Group.find_by!(id: params[:id])
        group.destroy
        render json: {deleted: group}, status: :ok
    end

    private

    def create_params
        params.permit(:group_name, :description, :owner_id)
    end

    def edit_params
        params.permit(:group_name, :description)
    end

end
