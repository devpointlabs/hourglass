class Api::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy, :u_by_p]

  def index
    render json: Project.all
  end

  def projects_with_data
    render json: Project.projects_with_data
  end

  def show
    render json: Project.project_with_data(params[:id])
  end

  def get_last_project
    render json: Project.last
  end

  def create
    project = Project.new(project_params)
    if project.save
      Task.create(name: "Programming", billable: true, price_per_hour: 50, project_id: Project.last.id )
      Task.create(name: "Design", billable: true, price_per_hour: 50, project_id: Project.last.id )
      Task.create(name: "Project Management", billable: true, price_per_hour: 50, project_id: Project.last.id )
      render json: project
    else
      render json: project.errors, status: 422
    end
    
  end

  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: 422
    end
  end

  def destroy
    @project.destroy
  end

  # def u_by_p(id)
  #   project = Project.find(id)
  #   render json: project.users
  # end

  def u_by_p
    render json: @project.users
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :client_name, :planned_start, :planned_end, :budget)
  end
end
