Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do

    resources :projects do
      resources :tasks
    end

    resources :tasks, :timeblocks  

    resources :users, only: [:update, :index]
  end
  get '/api/:task_id/timeblocks' => 'api/timeblocks#task_timeblocks'

end
