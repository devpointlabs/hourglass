class Api::ProjectsController < ApplicationController
  before_action :set_project, only: [ :show, :update, :destroy]
  
  def index
    render json: Project.all 
  end

  def show
    render json: @project
  end

  def create
    project = Project.new(project_params)
    if project.save 
      render json: project
    else  
      render json: project.errors, status: 422
    end  
  end

  def update
    if @project.update(project_parmas)
      render json: @project
    else   
      render json: @project.errors, status: 422
    end    
  end

  def destroy
    @project.destroy
  end

  private 

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params 
    params.require(:projects).permit(:name, :client_name, :planned_start, :planned_end, :notes)
  end  
end
