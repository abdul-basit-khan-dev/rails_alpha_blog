class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the alpha blog #{@user.name}"
      redirect_to articles_path
    else
      render "new"
    end
  end
  
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end