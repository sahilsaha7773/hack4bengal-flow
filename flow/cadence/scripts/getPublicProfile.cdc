import UserProfile from "../contracts/UserProfile.cdc"

pub fun main(addr: Address): UserProfile.ProfileStruct{
  var acc = getAccount(addr)
  var publicProfileRef = 
              acc.getCapability(/public/Profile).borrow<&UserProfile.Profile>() ?? panic("Could not borrow public profile reference")
  return publicProfileRef.getProfileStruct()
}