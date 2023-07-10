import NonFungibleToken from "./standards/NonFungibleToken.cdc"
import FlowToken from "./FlowToken.cdc"
import FungibleToken from "./standards/FungibleToken.cdc"

pub contract FlowVideo: NonFungibleToken {
  pub var totalSupply: UInt64 // Counter for total number of NFTs minted

  pub var availableNFTs: {UInt64: Address} // Map of NFT IDs to NFTs

  pub event ContractInitialized()

  /// Event that is emitted when a token is withdrawn,
  /// indicating the owner of the collection that it was withdrawn from.
  ///
  /// If the collection is not in an account's storage, `from` will be `nil`.
  ///
  pub event Withdraw(id: UInt64, from: Address?)

  /// Event that emitted when a token is deposited to a collection.
  ///
  /// It indicates the owner of the collection that it was deposited to.
  ///
  pub event Deposit(id: UInt64, to: Address?)

  pub resource NFT: NonFungibleToken.INFT { // Resource struct for each NFT
    pub let id: UInt64 // Unique ID for each NFT

    pub var title: String // Title of the NFT
    pub var description: String // Description of the NFT
    pub let videoCID: String // IPFS CID of the video
    pub var likes: UInt64 // Number of likes on the NFT
    pub var dislikes: UInt64 // Number of dislikes on the NFT
    pub var views: UInt64 // Number of views on the NFT
    // pub var comments: [String] // Array of comments on the NFT
    // pub var comments: @{UInt64: String} // Map of comment IDs to comments

    init(
      title: String,
      description: String,
      videoCID: String,
    ) {
      self.id = FlowVideo.totalSupply // Set ID to current totalSupply
      FlowVideo.totalSupply = FlowVideo.totalSupply + 1 // Increment totalSupply

      self.title = title // Set title to "Untitled"
      self.description = description // Set description to "No description"
      self.videoCID = videoCID // Set videoCID to ""
      self.likes = 0 // Set likes to 0
      self.dislikes = 0 // Set dislikes to 0
      self.views = 0 // Set views to 0
      // self.comments = [] // Initialize comments to empty array
      // self.comments = {} // Initialize comments to empty map
    }
  }
  
  pub resource interface MyCollectionPublic { // Public interface for Collection
    pub fun deposit(token: @NonFungibleToken.NFT)
    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT
    pub fun getIDs(): [UInt64]
    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
    pub fun borrowEntireNFT(id: UInt64): &NFT
  }
  pub resource interface MyCollectionPrivate {
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT
  }
  pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MyCollectionPublic, MyCollectionPrivate { // Container for all NFTs owned by an account
    // pub let owner: Address // Address of the account that owns this collection
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT} // Map of NFT IDs to NFTs

    pub fun deposit(token: @NonFungibleToken.NFT) { // Deposit an NFT into the collection
      FlowVideo.availableNFTs[token.id] = self.owner!.address
      self.ownedNFTs[token.id] <-! token
    }
    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT { // Withdraw an NFT from the collection
      log(self.ownedNFTs.keys)
      // log(self.ownedNFTs.values)
      let token: @NonFungibleToken.NFT <- self.ownedNFTs.remove(key: withdrawID) ?? panic("NFT not found in collection")
      // FlowVideo.availableNFTs.remove(key: withdrawID)
      emit Withdraw(id: withdrawID, from: self.owner!.address)
      return <-token
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      pre {
          self.ownedNFTs[id] != nil: "NFT does not exist in the collection!"
      }
      return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
    }

    pub fun borrowEntireNFT(id: UInt64): &NFT {
      let refNFT = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
      return refNFT as! &NFT
    }

    pub fun getIDs(): [UInt64] { // Get all NFT IDs in the collection
      return self.ownedNFTs.keys
    }

    init() {
      // self.owner = owner
      self.ownedNFTs <- {}
    }

    destroy () {
      destroy self.ownedNFTs
    }
  }

  pub fun purchaseNFT(nftId: UInt64, recipient: &Collection{FlowVideo.MyCollectionPublic}, payment: @FlowToken.Vault, owner: Address) {
      pre {
          payment.balance == 100.0: "You did not pass in the correct amount of Flow Token."
      }

      let ownerVault: &FlowToken.Vault{FungibleToken.Receiver} = self.account.getCapability(/public/flowTokenReceiver)
                              .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
      ownerVault.deposit(from: <- payment)
      let ownerPublicCollection: &FlowVideo.Collection{FlowVideo.MyCollectionPublic} = getAccount(owner).getCapability(/public/Collection)
                              .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>()!
      // let privateCollection = self.account.getCapability(/private/Collection)
      // .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPrivate}>()!
      let nft <- ownerPublicCollection.withdraw(withdrawID: nftId)
      // let nft: @FlowVideo.NFT <- (privateCollection.ownedNFTs.remove(key: nftId) as! @FlowVideo.NFT?) ?? panic("This NFT is not available for purchase, or it doesn't exist.")
      recipient.deposit(token: <- nft)
  }

  pub fun getNFTMetadata(nftId: UInt64): &FlowVideo.NFT {
    let add =  self.availableNFTs[nftId]!
    let publicRef = getAccount(add).getCapability(/public/Collection)
                        .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>() 
                        ?? panic("Could not borrow public collection reference")
    let nftRef = publicRef.borrowEntireNFT(id: nftId)
    return nftRef
  }
  pub fun createEmptyCollection(): @Collection { // Create a new collection and return it
    return <-create Collection()
  }
  pub fun createNFT(
      title: String,
      description: String,
      videoCID: String,
      owner: Address
    ): @NFT { // Create a new NFT and return it

      var newNFT: @NFT <-create NFT(
        title: title,
        description: description,
        videoCID: videoCID
      )
      FlowVideo.availableNFTs[newNFT.id] = owner
      return <- newNFT
    }
  pub resource NFTMinter { // Resource struct for NFTMinter
    pub fun createNFT(
      title: String,
      description: String,
      videoCID: String,
      owner: Address
    ): @NFT { // Create a new NFT and return it

      var newNFT: @NFT <-create NFT(
        title: title,
        description: description,
        videoCID: videoCID
      )
      FlowVideo.availableNFTs[newNFT.id] = owner
      return <- newNFT
    }

    init() {

    }
  }  

  init() {
    self.totalSupply = 0 // Initialize totalSupply to 0
    self.availableNFTs = {} // Initialize availableNFTs to empty map

    emit ContractInitialized()
    self.account.save(<- create NFTMinter(), to: /storage/Minter)
  }
}