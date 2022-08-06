Rails.application.routes.draw do

  resources :tracks
  resources :groups
  resources :memberships
  resources :messages
  resources :actions

  # custom routes
  get "/users/:id/tracks", to: "tracks#show_for_user"   # show the tracks for a user
  get "/users/:id/groups", to: "groups#show_for_user"   # show the groups for a user
  get "/users/:id/owned_groups", to: "groups#show_for_owner" # show the owned_groups for a user

  get "/tracks/:id/actions", to: "actions#show_for_track"    # show the actions for a track

  get "/groups/:id/messages", to: "messages#show_for_group"  # show the messages for a group
  get "/groups/:id/users", to: "users#show_for_group"  # show the users for a group - probably don't want this
  get "/groups/:id/memberships", to: "memberships#show_for_group" # show the memberships for a group
  get "/groups/:id/tracks", to: "tracks#show_for_group"      # show the tracks for a group


  # log in / log out actions
  post "/signup", to: "users#create" # new signup
  get "/me", to: "users#show_me" # return visit check session cookie
  post "/login", to: "sessions#create" # explicit login
  delete "/logout", to: "sessions#destroy" # log out

  # other users model actions
  get "/users", to: "users#index"
  get "/users/:id", to: "users#show"
  patch "/users/:id", to: "users#update"
  delete "/users/:id", to: "users#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
