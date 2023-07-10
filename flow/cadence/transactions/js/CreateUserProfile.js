export const CreateUserProfile = `
import UserProfile from 0xDeployer
transaction(name: String, email: String, bio: String) {
  prepare(acct: AuthAccount){
    acct.save<@UserProfile.Profile>(<- UserProfile.createProfile(name: name, email: email, bio: bio),
     to: /storage/Profile) 
    acct.link<&UserProfile.Profile>(/public/Profile, target: /storage/Profile)
  }
  execute {
    log("Stored User Profile")
  }
}
`