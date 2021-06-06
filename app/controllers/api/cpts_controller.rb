class Api::CptsController < ApplicationController
    before_action :ensure_logged_in
    skip_before_action :verify_authenticity_token

    def index
        @cpts = Cpt.all
        render :index
    end

    def show
        @cpt = Cpt.find(params[:id])
        render :show
    end

    def new
        @cpt = Cpt.new
    end

    def edit
        @cpt = Cpt.find(params[:id])
    end

    def create
        @cpt = Cpt.new(cpt_params)
        if @cpt.save
            render :show
        else
            render json: @cpt.errors.full_messages, status: 422
        end
    end

    def update
        @cpt = Cpt.find(params[:cpt][:id])
        if @cpt.update(cpt_params)
            render :show
        else
            render json: @cpt.errors.full_messages, status: 422
        end
    end

    def destroy
        @cpt = cpt.find(params[:id])
        if @cpt
            @cpt.destroy
        end
    end

    def cpt_params
        params.require(:cpt).permit(
            :cpt_code,
            :cpt_description,
            :billed_amount
        )
    end
end
