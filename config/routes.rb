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
  end
  get '/api/:task_id/timeblocks' => 'api/timeblocks#task_timeblocks'

end
