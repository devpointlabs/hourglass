Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do
    resources :projects, only: [:index, :update] do
      resources :timeboards
    end
  end
end
