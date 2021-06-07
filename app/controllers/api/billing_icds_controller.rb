class Api::BillingIcdsController < ApplicationController
    before_action :ensure_logged_in
    skip_before_action :verify_authenticity_token

    def index
        @billing_icds = BillingCpt.all
        render :index
    end

    def show
        @billing_icd = BillingCpt.find(params[:id])
        render :show
    end

    def new
        @billing_icd = BillingCpt.new
    end

    def edit
        @billing_icd = BillingCpt.find(params[:id])
    end

    def create
        @billing_icd = BillingCpt.new(billing_icd_params)
        if @billing_icd.save
            render :show
        else
            render json: @billing_icd.errors.full_messages, status: 422
        end
    end

    def update
        @billing_icd = BillingCpt.find(params[:billing_icd][:id])
        if @billing_icd.update(billing_icd_params)
            render :show
        else
            render json: @billing_icd.errors.full_messages, status: 422
        end
    end

    def destroy
        @billing_icd = billing_icd.find(params[:id])
        if @billing_icd
            @billing_icd.destroy
        end
    end

    def billing_icd_params
        params.require(:billing_icd).permit(
            :icd_id,
            :billing_cpt_id,
        )
    end
end
