@billing_cpts.each do |billing_cpt|
    json.set! billing_cpt.id do
        json.partial! 'billing_cpt', billing_cpt: billing_cpt
    end
end