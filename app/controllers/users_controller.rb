class UsersController < ApplicationController
    skip_before_action :authorize

    # post "/signup"
    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
    end

    # get "/me"
    def show_me
        new_user = User.find_by(id: session[:user_id])
        if new_user
            render json: new_user
        else
            render json: {error: "Not logged in"}, status: :unauthorized
        end
    end

    # get "/users"
    def index
        render json: User.all, status: :ok
    end

    # get "/users/:id"
    def show
        render json: User.find_by!(id: params[:id]), status: :ok
    end

    # get /groups/:id/users
    def show_for_group
        render json: Group.find_by!(id: params[:id]).users, status: :ok
    end

    def update
        user = User.find_by!(id: params[:id])
        user.update!(edit_params)
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email,:profile_image, :city, :state, :country )
    end

    def edit_params
        params.permit(:password, :password_confirmation, :email,:profile_image, :city, :state, :country )
    end
end