Rails.application.routes.draw do

  resources :relationships
  resources :goals
  resources :tracks
  resources :groups
  resources :memberships
  resources :messages
  resources :actions

  # custom routes
  get "/users/:id/tracks", to: "tracks#show_for_user"   # show the tracks for a user
  get "/users/:id/groups", to: "groups#show_for_user"   # show the groups for a user
  get "/users/:id/owned_groups", to: "groups#show_for_owner" # show the owned_groups for a user
  get "/users/search/:searchterm", to: "users#search_by_username" # search the users by username
  get "/users/:id/goals", to: "goals#show_for_user" #show the goals of a user
  get "/users/:id/relationships", to: "relationships#show_for_user" #show the relationships of a user
  get "/users/:id/friends", to: "relationships#show_friends_for_user" #show the friends of a user

  get "/tracks/:id/actions", to: "actions#show_for_track"    # show the actions for a track 
  
  get "/groups/:id/messages", to: "messages#show_for_group"  # show the messages for a group
  get "/groups/:id/users", to: "users#show_for_group"  # show the users for a group - probably don't want this
  get "/groups/:id/memberships", to: "memberships#show_for_group" # show the memberships for a group
  get "/groups/:id/tracks", to: "tracks#show_for_group"      # show the tracks for a group
  get "/groups/:id/actions", to: "actions#show_for_group"      # show the actions for a group 

  # log in / log out actions
  post "/signup", to: "users#create" # new signup
  get "/me", to: "users#show_me" # return visit check session cookie
  post "/login", to: "sessions#create" # explicit login
  delete "/logout", to: "sessions#destroy" # log out

  # other users model actions
  get "/users", to: "users#index"
  get "/users/:id", to: "users#show"
  put "/users/:id", to: "users#update"
  delete "/users/:id", to: "users#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
