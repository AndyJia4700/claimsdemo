class Api::IcdsController < ApplicationController
    before_action :ensure_logged_in
    skip_before_action :verify_authenticity_token

    def index
        @icds = Icd.all
        render :index
    end

    def show
        @icd = Icd.find(params[:id])
        render :show
    end

    def new
        @icd = Icd.new
    end

    def edit
        @icd = Icd.find(params[:id])
    end

    def create
        @icd = Icd.new(icd_params)
        if @icd.save
            render :show
        else
            render json: @icd.errors.full_messages, status: 422
        end
    end

    def update
        @icd = Icd.find(params[:icd][:id])
        if @icd.update(icd_params)
            render :show
        else
            render json: @icd.errors.full_messages, status: 422
        end
    end

    def destroy
        @icd = icd.find(params[:id])
        if @icd
            @icd.destroy
        end
    end

    def icd_params
        params.require(:icd).permit(
            :icd_code,
            :icd_description,
        )
    end
end
