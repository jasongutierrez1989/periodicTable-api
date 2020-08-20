Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/elements", to: "elements#index"
  get "/categories", to: "categories#index"

  get '/elements/:id' => 'elements#show'
  get '/categories/:id' => 'categories#show'

  get '/details/:category_id/:element_id/:group_id/:period_id' => 'details#show'
  patch '/details/:category_id/:element_id/:group_id/:period_id' => 'details#update'
end
