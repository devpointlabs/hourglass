class Api::TasksController < ApplicationController
  before_action :set_project, except: [:destroy, :tasks_with_data]
  before_action :set_task, only: [ :show, :update, :destroy]
  
  def index
    render json: @project.tasks
  end

  def show
    render json: @task
  end

  def create
    task = @project.tasks.new(task_params)
    if task.save 
      render json: task
    else  
      render json: task.errors, status: 422
    end  
  end

  def update
    if @task.update(task_params)
      render json: @task
    else   
      render json: @task.errors, status: 422
    end    
  end

  def tasks_with_data
    render json: Task.tasks_with_data(params[:project_id])
  end

  def destroy
    @task.destroy
  end

  def tasks_of_project
   render json: @project.tasks.find_with_hours
  end

  def billable_task_totals
    render json: Task.billable_task_totals(params[:project_id])
  end

  private 

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params 
    params.require(:task).permit(:name, :description, :billable, :price_per_hour)
  end  
end
