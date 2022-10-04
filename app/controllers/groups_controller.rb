class GroupsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /groups
    def index
        render json: Group.all, status: :ok
    end

    # get /groups/:id
    def show
        render json: Group.find_by!(id: params[:id]), status: :ok
    end

    # get /users/:id/groups - returns groups the user is a MEMBER of (not owner)
    def show_for_user
        render json: current_user.groups, status: :ok
    end

    # get /users/:id/owned_groups - returns groups the user is a ONWER of
    def show_for_owner
        render json: current_user.owned_groups, status: :ok
    end

    # post /groups
    def create
        new_group = Group.create!(create_params) # establishes the new group and owner
        Membership.create!( user_id: params[:owner_id], group_id: new_group.id ) # adds owner as member
        render json: new_group, status: :created
    end

    # patch or put /groups/:id
    def update
        group = Group.find_by!(id: params[:id])
        group.update!(edit_params)
        render json: group, status: :ok
    end

    # delete /groups/:id
    def destroy
        group = Group.find_by!(id: params[:id])
        group.destroy
        render json: {deleted: group}, status: :ok
    end

    private

    def create_params
        params.except(:group).permit(:group_name, :description, :owner_id) # Note: added the ".except(:group)" 
    end

    def edit_params
        params.permit(:group_name, :description)
    end

end
