class RelationshipsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /relationships
    def index
        render json: Relationship.all, status: :ok
    end

    # get /relationships/:id
    def show
        render json: Relationship.find_by!(id: params[:id]), status: :ok
    end

    # get "/users/:id/relationships"
    def show_for_user
        render json: current_user.relationships, status: :ok # returns rela's (not users)
    end

    # get "/users/:id/friends"
    def show_friends_for_user
        render json: current_user.friends, status: :ok  # returns users (people)
    end

    # post /relationships
    def create
        render json: Relationship.create!(create_params), status: :created
    end

    # patch or put /relationships/:id
    def update
        relationship = Relationship.find_by!(id: params[:id])
        relationship.update!(edit_params)
        render json: relationship, status: :ok
    end

    # delete /relationships/:id
    def destroy
        relationship = Relationship.find_by!(id: params[:id])
        relationship.destroy
        render json: {deleted: relationship}, status: :ok
    end

    private

    def create_params
        params.permit(:user_id, :friend_id )
    end

    def edit_params
        params.permit(:friend_id )
    end

end
