Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"


  namespace :api do
    resources :projects do
      resources :tasks
    end

    resources :projects do
      resources :assignments
    end

    resources :tasks, :timeblocks

    resources :users, only: [:update, :index]


    resources :tasks do
      resources :timeblocks, only: [:index, :show]
    end
  end
  get "/api/:task_id/timeblocks" => "api/timeblocks#task_timeblocks"
  get "/api/:project_id/view_tasks", to: 'api/tasks#tasks_of_project'
  get "/api/projects/:project_id/users/:user_id", to: 'api/assignments#find_by_u_and_p'
  get "/api/projects/:id/users", to: "api/projects#u_by_p"
  # post "/api/projects/users", to: "api/projects#u_by_p"
end
