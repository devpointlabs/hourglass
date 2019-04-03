class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.current_project(current_user.projects)
  end

  def update
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.nickname = params[:nickname] ? params[:nickname] : user.nickname
    user.email = params[:email] ? params[:email] : user.email
    user.password = params[:password] ? params[:password] : user.password
    user.password_confirmation = params[:password_confirmation] ? params[:password_confirmation] : user.password_confirmation

    file = params[:file]

    if file 
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true )
        user.image = cloud_image['secure_url']
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

  def current_project
    render json: User.current(current_user.projects )
  end

end
