export const createVideoNFT = `
import FlowVideo from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

transaction(
  recipient: Address,
  title: String,
  description: String,
  videoCID: String,
  ) {
  // the NFT Minter will sign this transaction
  prepare(acct: AuthAccount) {
    // let nftMinter = acct.borrow<&FlowVideo.NFTMinter>(from: /storage/Minter)
    //   ?? panic("Could not borrow a reference to the NFTMinter")
    acct.save(<- FlowVideo.createEmptyCollection(), to: /storage/Collection) // Save the collection to the account's storage
    acct.link<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>(/public/Collection, target: /storage/Collection) // Link the collection to the account's public interface
    acct.link<&FlowVideo.Collection{FlowVideo.MyCollectionPrivate}>(/private/Collection, target: /storage/Collection) // Link the collection to the account's private interface

    let publicReference = getAccount(recipient).getCapability(/public/Collection)
      .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>()
      ?? panic("Could not borrow a reference to the NFTReceiver")

    publicReference.deposit(token: <- FlowVideo.createNFT(
      title: title,
      description: description,
      videoCID: videoCID,
      owner: recipient
    ))
  }

  execute {
    log("Stored a newly minted NFT in the user's collection")
  }
}`