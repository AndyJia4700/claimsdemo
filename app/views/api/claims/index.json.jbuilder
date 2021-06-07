@claims.each do |claim|
    json.set! claim.id do
        json.partial! 'claim', claim: claim
    end
end