class Api::TimeblocksController < ApplicationController
  before_action :set_task, only: [:task_timeblocks]
  before_action :set_timeblock, only: [:show, :update, :destroy]

  def index
    projects = current_user.projects
    tasks = []
    projects.each do |project|
      tasks += Project.find(project.id).tasks
    end

    data = { timeBlocks: current_user.timeblocks,
             projects: projects,
             tasks: tasks }

    render json: data
  end

  def show
    render json: @timeblock
  end

  def create
    timeblock = Timeblock.new(timeblock_params)
    if timeblock.save
      render json: timeblock
    else
      render json: timeblock.errors, status: 422
    end
  end

  def update
    if @timeblock.update(timeblock_params)
      render json: @timeblock
    else
      render json: @timeblock.errors, status: 422
    end
  end

  def destroy
    @timeblock.destroy
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_timeblock
    @timeblock = Timeblock.find(params[:id])
  end

  def timeblock_params
    params.require(:timeblock).permit(:start_time, :end_time, :user_id, :task_id, :status)
  end
end
