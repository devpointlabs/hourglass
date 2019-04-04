Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do
    resources :projects do
      resources :tasks
    end

    resources :tasks do
      resources :timeblocks, only: [:index, :show]
    end

    resources :timeblocks, except: :index

    resources :users, only: :update
  end
  get "/api/:user_id/my_timeblocks" => "api/timeblocks#my_timeblocks"
end
