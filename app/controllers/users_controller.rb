class UsersController < ApplicationController
    skip_before_action :authorize

    # post "/signup"
    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
    end

    # get "/me" - login using previously saved session cookie
    def show_me
        # current_user found in application_controller helper_method
        if current_user
            render json: current_user
        else
            render json: {errors: ["Not logged in"]}, status: :unauthorized
        end
    end

    # get /groups/:id/users
    def show_for_group
        render json: Group.find_by!(id: params[:id]).users, status: :ok
    end

    # get /users/search/:searchterm
    def search_by_username
        user = User.search( params[:searchterm] )
        render json: user, status: :ok
    end

    # get "/users"
    def index
        render json: User.all, status: :ok
    end

    # get "/users/:id"
    def show
        render json: current_user, status: :ok
    end

    # put "/users/:id"
    def update
        user = current_user
        user.update!(edit_params)
        render json: user, status: :ok
    end

    # delete "/users/:id" - NOT SURE this should be allowed...
    def destroy
        user = current_user
        user.destroy
        render json: {deleted: user}, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email,:profile_image, :city, :state, :country )
    end

    def edit_params
        params.permit(:password, :password_confirmation, :email,:profile_image, :city, :state, :country )
    end
end