@billing_icds.each do |billing_icd|
    json.set! billing_icd.id do
        json.partial! 'billing_icd', billing_icd: billing_icd
    end
end