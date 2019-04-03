Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do

    resources :projects do
      resources :timeblocks

    end
  end
  get '/api/timeblocks' => 'api/timeblocks#all_timeblocks'

end
