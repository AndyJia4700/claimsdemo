class Api::BillingCptsController < ApplicationController
    before_action :ensure_logged_in
    skip_before_action :verify_authenticity_token

    def index
        # billing_list = Claim.find(params[:claim].to_i).billing_list
        # @billing_cpts = billing_list.map do |billing_id|
        #     BillingCpt.find(billing_id)
        # end

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
            @claim = Claim.find(@billing_cpt.claim_id)
            updated_billing_list = @claim.billing_list.push(@billing_cpt.id)
            @claim.update(billing_list: updated_billing_list)
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
            :cpt_id,
            :modifier1,
            :modifier2,
            :units,
            :denied_reason,
            :denied,
            :approved,
            :claim_id,
        )
    end
end
