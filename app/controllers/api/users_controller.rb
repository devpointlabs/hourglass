class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:projects, :find_timeblocks, :employee, :user_task_hours]

  def index
    if current_user.admin == true
      render json: User.all
    end
  end

  def grab_users_with_timeblocks
    users = User.all
    usertimeblocks = []
    users.map do |u|
      timeBlocksByTask = []
      taskIdArray = u.timeblocks.map do |utb|
        utb.task_id
      end
      taskIdArray.uniq!

      taskIdArray.each do |taskId|
        blocksByTask = []
        u.timeblocks.each do |block|
          if block.task_id == taskId
            blocksByTask << block
          end
        end
        timeBlocksByTask << { taskId: taskId, blocks: blocksByTask }
      end
      usertimeblocks << { name: u.name, userId: u.id, timeBlocksByTask: timeBlocksByTask }
    end

    render json: usertimeblocks
  end

  def update
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.nickname = params[:nickname] ? params[:nickname] : user.nickname
    user.email = params[:email] ? params[:email] : user.email

    file = params[:file]

    if (file != "undefined" && file != "")
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        user.image = cloud_image["secure_url"]
        # rescue => e
        #   render json: { errors: e }, status: 422
      end
    end

    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  def users_with_project_hours
    render json: User.total_hours_per_project(params[:project_id])
  end

  def current_project
    render json: User.current(current_user.projects)
  end

  def employee
    render json: @user
  end

  def projects
    render json: @user.projects
  end

  def find_timeblocks
    render json: @user.timeblocks
  end

  def total_task_hours
    render json: User.total_task_hours(params[:id])
  end

  def toggle_admin
    user = User.find(params[:user_id])
    user.update(admin: !user.admin)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
