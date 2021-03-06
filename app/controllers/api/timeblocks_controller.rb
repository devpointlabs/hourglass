class Api::TimeblocksController < ApplicationController
  before_action :set_task, only: [:task_timeblocks]
  before_action :set_timeblock, only: [:show, :update, :destroy]
  before_action :set_user, only: [:week_timeblocks]

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

  def pending_timeblock
    render json: Timeblock.pending_timeblock(params[:timeblock_id])
  end

  def admin_get_all_timeblocks
    projects = Project.all
    tasks = []
    projects.each do |project|
      tasks += Project.find(project.id).tasks
    end

    data = { timeBlocks: Timeblock.all,
            projects: projects,
            tasks: tasks,
            users: User.all }

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

  def pending_timeblocks
    render json: Timeblock.pending_timeblocks
  end

  def user_pending_timeblocks
    render json: Timeblock.user_pending_timeblocks(params[:user_id])
  end

  def timeblocks_by_task
    render json: Timeblock.timeblocks_by_task(params[:id])
  end

  def weekly_project_hours
    render json: Timeblock.weekly_project_hours(params[:id])
  end

  def approve_pending_timeblocks
    Timeblock.approve_pending_timeblocks
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_timeblock
    @timeblock = Timeblock.find(params[:id])
  end

  def set_user
    @user = User.find(params[:id])
  end

  def timeblock_params
    params.require(:timeblock).permit(:start_time, :end_time, :user_id, :task_id, :status, :manualEntry)
  end
end
