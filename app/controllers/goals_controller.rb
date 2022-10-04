class GoalsController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /goals
    def index
        render json: Goal.all, status: :ok
    end

    # get /goals/:id
    def show
        render json: Goal.find_by!(id: params[:id]), status: :ok
    end

    def show_for_user
        render json: current_user.goals, status: :ok
    end

    # post /goals
    def create
        render json: Goal.create!(create_params), status: :created
    end

    # patch or put /goals/:id
    def update
        goal = Goal.find_by!(id: params[:id])
        goal.update!(edit_params)
        render json: goal, status: :ok
    end

    # delete /goals/:id
    def destroy
        goal = Goal.find_by!(id: params[:id])
        goal.destroy
        render json: {deleted: goal}, status: :ok
    end

    private

    def create_params
        params.permit(:user_id, :title, :description, :why )
    end

    def edit_params
        params.permit(:title, :description, :why )
    end

end
