class MessagesController < ApplicationController
    skip_before_action :authorize # delete before deploying!

    # get /things
    def index
        render json: Message.all, status: :ok
    end

    # get /things/:id
    def show
        render json: Message.find_by!(id: params[:id]), status: :ok
    end

    def show_for_group
        render json: Group.find_by!(id: params[:id]).messages, status: :ok
    end

    # post /things
    def create
        render json: Message.create!(create_params), status: :created
    end

    # patch or put /things/:id
    def update
        message = Message.find_by!(id: params[:id])
        message.update!(edit_params)
        render json: message, status: :ok
    end

    # delete /things/:id
    def destroy
        message = Message.find_by!(id: params[:id])
        message.destroy
        render json: {deleted: message}, status: :ok
    end

    private

    def create_params
        params.permit(:user_id, :group_id, :text )
    end

    def edit_params
        params.permit(:text )
    end

end
