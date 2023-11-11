class AppointmentsController < ApplicationController

    def create 
        appointment = current_client.appointments.create(appointment_params)
        if appointment.valid?
            render json: appointment, status: :created
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        appointment = current_client.appointments.find_by(id: params[:id])
        if appointment
            appointment.destroy
            head :no_content
        else
            render json: { error: 'You do not have permission to remove this appointment' }, status: :unauthorized
        end
    end

    private 

    def current_client
        Client.find_by(id: session[:id])
    end

    def appointment_params
        params.permit(:trainer_id, :start, :end)
    end

end
