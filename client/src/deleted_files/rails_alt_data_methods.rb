# to be placed in the User Class

def self.biggest_borrower
    self.all.max{|a,b| a.rentals.length <=> b.rentals.length }
    
    self.all.max_by{|user| user.rentals.length}

    self.all.max_by do |user|
        user.rentals.length
        puts "here"
    end

    #User.biggest_borrower
    self.preload(:rentals).max_by{ |user| user.rentals.length }
    self.joins(:rentals).group("users.id").order("COUNT(rentals.id) DESC").limit(1)

end

def self.search(tool_name)
    self.all.find_all{ |tool| tool.name.downcase.include? (tool_name.downcase) } 
end

def self.most_popular
    self.all.max_by{|tool| tool.rentals.length}
end