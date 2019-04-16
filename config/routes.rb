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
  get "/api/admin/timeblocks", to: "api/timeblocks#admin_get_all_timeblocks"
  get "/api/users/timeblocks", to: "api/users#grab_users_with_timeblocks"
  get "/api/:project_id/view_tasks", to: "api/tasks#tasks_of_project"
  get "/api/projects/:project_id/users/:user_id", to: "api/assignments#find_by_u_and_p"
  get "/api/projects/:id/users", to: "api/projects#u_by_p"
  get "/api/users/:id", to: "api/users#employee"
  get "/api/users/:id/timeblocks", to: "api/users#find_timeblocks"
  get "/api/users/:id/projects", to: "api/users#projects"
  get "/api/timeblock/pending", to: "api/timeblocks#pending_timeblocks"
  get "api/task/:id/timeblocks_by_task", to: "api/timeblocks#timeblocks_by_task"
  # post "/api/projects/users", to: "api/projects#u_by_p"
  get "api/project/projects_with_data", to: "api/projects#projects_with_data"
  get "api/projectdata/:project_id/tasks_with_data", to:"api/tasks#tasks_with_data"

  get "*other", to: "static#index"

end
