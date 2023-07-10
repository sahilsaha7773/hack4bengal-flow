pub contract UserProfile {
  pub resource interface ProfilePublic {

    pub fun getProfileStruct(): ProfileStruct
  }
  
  pub resource Profile: ProfilePublic {
    pub let name: String
    pub let email: String
    pub let bio: String

    pub fun getProfileStruct(): ProfileStruct {
      return ProfileStruct(name: self.name, email: self.email, bio: self.bio)
    }

    init(name: String, email: String, bio: String) {
      self.name = name
      self.email = email
      self.bio = bio
    }
  }
  pub struct ProfileStruct {
    pub var name: String
    pub var email: String
    pub var bio: String

    pub fun updateProfile(name: String, email: String, bio: String) {
      self.name = name
      self.email = email
      self.bio = bio
    }

    init(name: String, email: String, bio: String) {
      self.name = name
      self.email = email
      self.bio = bio
    }
  }
  
  pub fun createProfile(name: String, email: String, bio: String): @Profile {
    return <- create Profile(name: name, email: email, bio: bio)
  }
}