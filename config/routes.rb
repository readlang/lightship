Rails.application.routes.draw do

  resources :tracks
  resources :groups
  resources :memberships
  resources :messages
  resources :actions

  # log in / log out actions
  post "/signup", to: "users#create" # new signup
  get "/me", to: "users#show" # return visit check session cookie

  post "/login", to: "sessions#create" # explicit login
  delete "/logout", to: "sessions#destroy" # log out


  get "/users", to: "users#index"
  patch "/users/:id", to: "users#update"


  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
