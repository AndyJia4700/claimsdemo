@icds.each do |icd|
    json.set! icd.id do
        json.partial! 'icd', icd: icd
    end
end