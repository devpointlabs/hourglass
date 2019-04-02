class Api::AssignmentsController < ApplicationController

before_action :set_assignment, only: [:update, :show, :destroy]

  def index
    render json: Assignment.all
  end

  def show
    render json: @assignment
  end

  def update
    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render json: @assignment.errors, status: 422
    end
  end

  def create
    assignment = Assignment.new(assignment_params)
    if assignment.save
      render json: assignment
    else 
      render json: assignment.errors, status: 422
    end
  end

  def destroy
    @assignment.destroy
  end

  private


  def set_assignment
    @assignment = Assignment.find(params[:id])
  end

  def assignment_params
    params.require(:assignment).permit(:project_id, :user_id)
  end
end
