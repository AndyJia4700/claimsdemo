class Api::BillingIcdsController < ApplicationController
    before_action :ensure_logged_in
    skip_before_action :verify_authenticity_token

    def index
        @billing_cpts = BillingCpt.all
        render :index
    end

    def show
        @billing_cpt = BillingCpt.find(params[:id])
        render :show
    end

    def new
        @billing_cpt = BillingCpt.new
    end

    def edit
        @billing_cpt = BillingCpt.find(params[:id])
    end

    def create
        @billing_cpt = BillingCpt.new(billing_cpt_params)
        if @billing_cpt.save
            render :show
        else
            render json: @billing_cpt.errors.full_messages, status: 422
        end
    end

    def update
        @billing_cpt = BillingCpt.find(params[:billing_cpt][:id])
        if @billing_cpt.update(billing_cpt_params)
            render :show
        else
            render json: @billing_cpt.errors.full_messages, status: 422
        end
    end

    def destroy
        @billing_cpt = billing_cpt.find(params[:id])
        if @billing_cpt
            @billing_cpt.destroy
        end
    end

    def billing_cpt_params
        params.require(:billing_cpt).permit(
            :billing_cpt_code,
            :billing_cpt_description,
            :billed_amount
        )
    end
end
