@cpts.each do |cpt|
    json.set! cpt.id do
        json.partial! 'cpt', cpt: cpt
    end
end