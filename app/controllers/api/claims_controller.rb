class Api::ClaimsController < ApplicationController
    before_action :ensure_logged_in, only:[:create]
    skip_before_action :verify_authenticity_token


    def index
        claim_list = Patient.find(params[:patient].to_i).claim_list
        @claims = claim_list.map do |claim_id|
            Claim.find(claim_id)
        end
        # @claims = Claim.all.select {|claim| claim.patient_id == params[:patient].to_i }
        render :index
    end

    def show
        @claim = Claim.find(params[:id])
        render :show
    end

    def new
        @claim = Claim.new
    end

    def create
        @claim = Claim.new(claim_params)
        if @claim.save
            @patient = Patient.find(@claim.patient_id)
            updated_claim_list = @patient.claim_list.push(@claim.id)
            @patient.update(claim_list: updated_claim_list)
            render :show
        else
            render json: @claim.errors.full_messages, status: 422
        end
    end

    private

    def claim_params
        params.require(:claim).permit(
            :patient_id,
            :claim_date_of_service,
            :claim_number,
            :message,
            :billing_list,
            :provider_id,
            :total_amount,
        )
    end
end
