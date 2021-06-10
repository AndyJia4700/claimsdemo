class Api::CptsController < ApplicationController
    before_action :ensure_logged_in, only:[:create]
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

    def create
        @cpt = Cpt.new(cpt_params)
        if @cpt.save
            render :show
        else
            render json: @cpt.errors.full_messages, status: 422
        end
    end

    private

    def cpt_params
        params.require(:cpt).permit(
            :cpt_code,
            :cpt_description,
            :billed_amount
        )
    end
end
