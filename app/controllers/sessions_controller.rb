class SessionsController < ApplicationController
  
  
  def new 
    
  end
  
  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      flash[:success] = 'You have successfull logged in'
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      flash.now[:danger] = "There was somthing wrong with you information..."
      render 'new'
    end
  end
  
  def destroy
    session[:user_id] = nil
    flash[:success] = "You have logged out..."
    redirect_to root_path
  end
  
end