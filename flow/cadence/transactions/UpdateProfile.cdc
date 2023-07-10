import UserProfile from "../contracts/UserProfile.cdc"

// transaction(name: String, email: String, bio: String) {
//   let profile: @UserProfile.Profile
//   prepare(acct: AuthAccount){
//     profile <- acct.storage
//   }
//   execute {
//     log("Stored User Profile")
//   }
// }