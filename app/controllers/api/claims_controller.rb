class Api::ClaimsController < ApplicationController
    before_action :ensure_logged_in, only:[:create]
    skip_before_action :verify_authenticity_token

    def index
        # @patient = Patient.find(params[:id])
        # @claims = Claim.all.select {|claim| claim.patient_id == @patient.id}
        @claims = Claim.all
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
        # @patient = Patient.find(params[:id])
        # @claim.patient_id = @patient.id
        if @claim.save
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
        )
    end
end
