class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.current_project(current_user.projects)
  end

  def update
    current_user.projects << params[:id].to_i
    current_user.save
  end

  def current_project
    render json: User.current(current_user.projects )
  end

end
