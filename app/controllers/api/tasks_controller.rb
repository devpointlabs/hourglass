class Api::TasksController < ApplicationController
  before_action :set_project
  before_action :set_task, only: [ :show, :update, :destroy]
  
  def index
    render json: Tasks.all 
  end

  def show
    render json: @task
  end

  def create
    task = Task.new(task_params)
    if task.save 
      render json: task
    else  
      render json: task.errors, status: 422
    end  
  end

  def update
    if @task.update(task_parmas)
      render json: @task
    else   
      render json: @task.errors, status: 422
    end    
  end

  def destroy
    @task.destroy
  end

  private 

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params 
    params.require(:tass).permit(:name, :description, :billable, :price_per_hour)
  end  
end
