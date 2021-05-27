class Api::UsersController < ApplicationController

    before_action :ensure_logged_in, only:[:update]
    skip_before_action :verfiy_authenticity_token

    def index
        @user = User.all
    end

    def show
        @user = User.find(params[:id])
    end

    def edit
        @user = User.find(params[:id])
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:user][:id])
        if @user && @user.id == current_user.id
            if @user.update(user_params)
                render :show
            end
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    
    def user_params
        params.require(:user).permit(
            :email,
            :password,
            :first_name,
            :last_name,
            :npi
        )
    end
end
