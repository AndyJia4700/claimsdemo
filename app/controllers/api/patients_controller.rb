class Api::PatientsController < ApplicationController
    before_action :ensure_logged_in, only:[:create, :update, :destroy]
    skip_before_action :verify_authenticity_token

    def index
        @patients = Patient.all.select {|patient| patient.user_id == current_user.id}
        render :index
    end

    def show
        @patient = Patient.find(params[:id]).user_id == current_user.id ? Patient.find(params[:id]) : nil
        render :show
    end

    def new
        @patient = Patient.new
    end

    def edit
        @patient = Patient.find(params[:id]).user_id == current_user.id ? Patient.find(params[:id]) : nil
    end

    def create
        @patient = Patient.new(patient_params)
        @patient.user_id = current_user.id
        if @patient.save
            render :show
        else
            render json: @patient.errors.full_messages, status: 422
        end
    end

    def update
        @patient = Patient.find(params[:patient][:id])
        if @patient && @patient.user_id == current_user.id
            if @patient.update(patient_params)
                render :show
            else
                render json: @patient.errors.full_messages, status: 422
            end
        else
            render json: @patient.errors.full_messages, status: 422
        end
    end

    def destroy
        @patient = patient.find(params[:id])
        if @patient && @patient.user_id == current_user.id
            @patient.destroy
        end
    end

    private

    def patient_params
        params.require(:patient).permit(
            :name,
            :birthdate,
            :insurance_id,
        )
    end
end
