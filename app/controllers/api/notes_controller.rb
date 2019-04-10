class Api::NotesController < ApplicationController
    before_action :set_project, except: [:destroy]
    before_action :set_note, only: [ :show, :update, :destroy]
    
    def index
      render json: Note.all 
    end
  
    def show
      render json: @note
    end
  
    def create
      note = @note.new(note_params)
      if note.save 
        render json: note
      else  
        render json: note.errors, status: 422
      end  
    end
  
    def update
      if @note.update(note_params)
        render json: @note
      else   
        render json: @note.errors, status: 422
      end    
    end
  
    def destroy
      @note.destroy
    end
  
    private 
  
    def set_project
      @project = Project.find(params[:project_id])
    end
  
    def set_note
      @note = Note.find(params[:note_id])
    end
    def note_params 
      params.require(:note).permit(:author, :datetime, :body)
    end  
  end
