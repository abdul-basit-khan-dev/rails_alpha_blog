Rails.application.routes.draw do
  root 'pages#index'
  get 'users/new'
  resources :articles
  get 'about', to: 'pages#about'
  
  # users controler and acitons 
  get 'signup', to: "users#new"
  resources :users, except: [:new]
  # users controler and acitons 
  
  # login users sessions contoller and it's actions
  get 'login', to: "sessions#new"
  post 'login', to: "sessions#create"
  delete 'logout', to: "sessions#destroy"
  # login users sessions contoller and it's actions

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
