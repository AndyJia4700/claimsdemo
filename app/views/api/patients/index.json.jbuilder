@patients.each do |patient|
    json.set! patient.id do
        json.partial! 'patient', patient: patient
    end
end