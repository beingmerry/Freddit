Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:index, :show, :create]
    resources :users do
      resources :posts, only: [:index, :create, :destroy, :update]
      resources :comments, only: [:index, :create]
      resources :likes, only: [:index, :create]
    end
    resources :posts, only: [:index, :show]
    resources :posts do
      resources :comments, only: [:index, :create]
    end
    resources :topics, only: [:index, :show]
    resources :comments, only: [:index]
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/me', to: 'sessions#show'
  end

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
