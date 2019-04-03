class Api::TimeblocksController < ApplicationController
  before_action :set_project, except: [:all_timeblocks]
  before_action :set_timeblock, only: [:show, :update, :destroy]

  def index
    render json: @project.timeblocks
  end

  def all_timeblocks
    render json: Timeblock.all
  end

  def show
    render json: @timeblock
  end

  def create
    timeblock = @project.timeblocks.new(timeblock_params)
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

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_timeblock
    @timeblock = Timeblock.find(params[:id])
  end

  def timeblock_params
    params.require(:timeblock).permit(:start_time, :end_time, :billable, :unbillable,)
  end
end
