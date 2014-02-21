NycRealEstate::Application.routes.draw do
  root to: "home#index"

  get '/counts' => 'home#counts'

  get '/prices' => 'home#prices'
end
