export const getAllAvailableNFTs = `
import FlowVideo from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

pub struct nftStruct {
pub var id: UInt64
pub var title: String
pub var description: String
pub var videoCID: String
pub var owner: Address
init(id: UInt64, title: String, description: String, videoCID: String, owner: Address) {
  self.id = id
  self.title = title
  self.description = description
  self.videoCID = videoCID
  self.owner = owner
}
}

pub fun main(): [nftStruct] {
let nfts = FlowVideo.availableNFTs
let arr: [nftStruct] = []
for id in nfts.keys {
  let add: Address = nfts[id]!
  // Get the public NFT collection reference for the recipient
  let publicRef = getAccount(add).getCapability(/public/Collection)
                  .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>() 
                  ?? panic("Could not borrow public collection reference")
  let nftRef = publicRef.borrowEntireNFT(id: id)
  let nft = nftStruct(id: id, title: nftRef.title, description: nftRef.description, videoCID: nftRef.videoCID, owner: add)
  arr.append(nft)
}
return arr
}`