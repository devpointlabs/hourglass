Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do

    resources :projects do
      resources :tasks

    end

    resources :users, only: [:update, :index]
      resources :tasks do
        resources :timeblocks, only: [:index, :show]
    end

    resources :timeblocks, except: [:index]
    end
  get '/api/:user_id/timeblocks' => 'api/timeblocks#my_timeblocks'

end
