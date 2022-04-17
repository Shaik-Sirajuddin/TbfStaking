/** @jsxImportSource theme-ui */
import { Flex, Text, Heading, Spinner, Button, Container } from "theme-ui"

import CollectionItem from "@/components/CollectionItem/CollectionItem"
import useGemFarmStaking from "hooks/useGemFarmStaking"
import { useWallet } from "@solana/wallet-adapter-react"
// import { LoadingIcon } from "@/components/icons/LoadingIcon"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Header from "@/components/Header/Header"
import { LoadingIcon } from "@/components/icons/LoadingIcon"
import { useEffect, useState } from "react"
import {  useConnection } from "@solana/wallet-adapter-react"
import { toPublicKey } from "lib/utils/ids"

import { PublicKey } from '@solana/web3.js';
import { initGemFarm } from "lib/gem-farm/common/gem-farm"
const StakePage = () => {
  const [farmId, setFarmId] = useState(process.env.NEXT_PUBLIC_GEMFARM_ID || "")
  const [minimumRequiredNFTs, setMinimumRequiredNFTs] = useState(1)
  const [isFiveDiffAndEligible, setFiveDifferentAndEligible] = useState(false)
  const [isFiveDifferent, setFiveDifferent] = useState(false)
  const [totalStaked , setTotalStaked] = useState(0)

  let gf: any;
  const setGlobalFarmId = (value) => {
    setFiveDifferent(false)
    if (value === "35oWr3gCUjtnYi5XsAxKygsEZVUYgXMUSMe5AeMhFzia") {
      setMinimumRequiredNFTs(1)
    }
    else if (value === "5oz9ztE35mz6bgyczdG4zSsTteA3wMdax9xPHQvjMMBK") {
      setMinimumRequiredNFTs(5)
    }
    else if (value === "BU2zhNVDTfDDfj7vrT7pJxnVWCNTXGFUoig38yQhTU78") {
      setMinimumRequiredNFTs(10)
    }
    else if (value === "9z9F6Nz42gt46tLf6cYJutjcBvRf9ExLMonTKbpfnbzw") {
      setMinimumRequiredNFTs(15)
    }
    else if (value === "BkxHZkiK4bJ8o7yShwXbP6tYGeqLoL864PCt6EafV5FE") {
      setMinimumRequiredNFTs(20)
    }
    else {
      setMinimumRequiredNFTs(5)
      setFiveDifferent(true)
    }
    setFarmId(value)
  }
  const {
    walletNFTs,
    farmerAccount,
    farmerVaultAccount,
    farmerStatus,
    selectedWalletItems,
    isLocked,
    availableA,
    feedbackStatus,
    handleStakeButtonClick,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleWalletItemClick,
    handleMoveToVaultButtonClick,
    farmerVaultNFTs,
    selectedVaultItems,
    handleMoveToWalletButtonClick,
    handleVaultItemClick,
    handleInitStakingButtonClick,
    handleRefreshRewardsButtonClick,
  } = useGemFarmStaking(farmId)

  const { publicKey } = useWallet()
  const { connection } = useConnection()

  
  const findFarmsByManager = async (manager: PublicKey) => {
    gf = await initGemFarm(connection, null);
    let farms  = await gf.fetchAllFarmPDAs(manager);
    let sum = 0
    farms.forEach(element => {
      sum+=parseInt(element.account.gemsStaked.toString())
    });
    setTotalStaked(sum)
    console.log('Found farms:', sum);
    // if (foundFarms.value.length) {
    //   farm.value =
    //     foundFarms.value[currentFarmIndex.value].publicKey.toBase58();
    //   //yes this is needed here, as sometimes farm.value stays same, but we want to rerender anyway
    //   updateFarmByPk(farm.value!);
    // }
    // isLoading.value = false;
  };
  
  const checkIsEligible = () => {
    
    console.log(farmerVaultNFTs)
    if(!isFiveDifferent) return 
    let animalArray = ["Rhino", "Buffalo", "Lion", "Leopard", "Elephant"]
    let map = new Map()
    animalArray.forEach((value, index, arr) => {
      map.set(animalArray[index], 0)
    })
    
    try {
      farmerVaultNFTs.forEach( (value,key,arr)=>{
        let attributes = farmerVaultNFTs[key].offChain.attributes
        var animal = ""
        try{
          animal = attributes[0].value
        }catch(e){
          animal = attributes[9].value
        }
        if(animal === null){
          animal = attributes[9].value
        }
        console.log(animal)
        map.set(animal,map.get(animal)+1)
      })
      
      let previous = map.get(animalArray[0])
      let isValidSet = true
      animalArray.forEach((value, index, arr) => {
         if(previous!==map.get(animalArray[index])){
           isValidSet = false
         }
      })
      if(previous <=0){
        isValidSet = false
      } 
      console.log(map)
      setFiveDifferentAndEligible(isValidSet)
    } catch (e) {
      setFiveDifferentAndEligible(false)
    }

  }

  useEffect(() => {
    checkIsEligible()
  }, [farmerVaultNFTs])
  useEffect( ()=> {
    let a = "HnoRSt7q8wqxymcs2RedZfEsNpT3ygjtujZngm2dTB4"
    findFarmsByManager(toPublicKey(a))
  } , [farmerVaultNFTs])

  return (
    <Container>


      <img
        sx={{
          padding: "5px",
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "30%",
          display: "block"
        }}
        src="/images/text_logo.png"
        alt="tbf"
      />
      <div>
      <h2 style={
        {
          textAlign: "center",
          marginBottom: "10px",
          marginLeft:"auto",
          marginRight:"auto",
       
          border :"1px solid",
          borderColor:"#fca903",
      
        }
      }  id="stakeName" > Staking </h2>
      </div>
      
      <br />

      <Header farmId={farmId} setFarmId={setGlobalFarmId} stakedCount ={totalStaked}/>


      <Flex
        sx={{
          flexDirection: "column",
          marginTop: "3.2rem",
          alignItems: "center",
          padding: "0 1.6rem",
        }}
      >
        <Heading>Your staking account</Heading>
        <Text>Below you can stake, unstake and collect rewards.</Text>

        {
          !publicKey ? (
            /** Render nothing if there is no wallet connected. */
            <Text
              sx={{
                textAlign: "center",
                margin: "2.5rem 0",
              }}
            >
              Connect your wallet first.
            </Text>
          ) : !farmerAccount ? (
            // <LoadingIcon
            //   size={"3.2rem"}
            //   sx={{
            //     margin: "3.2rem 0"
            //   }}
            // />
            <Text mt="1.6rem">   <LoadingIcon size="1.6rem" /> Please wait - Getting farm details</Text>
          ) : /** If there is farmerAccount variable, but no address, it means account isn't initialized */
            farmerAccount && !farmerAccount?.identity ? (
              <Button
                sx={{
                  margin: "3.2rem 0",
                }}
                onClick={
                  handleInitStakingButtonClick}
              >
                Create staking account
              </Button>
            ) : (
              <>
                {/** Render everything, since there is wallet and farmer account */}
                {/** Farmer account info section */}
                {farmerAccount?.identity ? (
                  <>
                    {/* <Flex
                      sx={{
                        flexDirection: "column",
                        margin: "1.6rem 0",
                      }}
                    >


                    </Flex> */}
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          
                            <img
                              sx={{
                                maxHeight: "2.4rem",
                              }}
                              src="images/gemtransparent.gif"
                            />
                            Staked TBF:&nbsp;

                            <Text color="#F5b00e">

                              {farmerAccount?.gemsStaked.toNumber()}&nbsp;&nbsp;
                            </Text>



                        </div>
                        <div className="col" style={{
                          textAlign: "center"
                        }}>
                          Vault state:
                          <Text color="#F5b00e"
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <b>&nbsp;{isLocked ? "locked" : "unlocked"}</b> &nbsp;&nbsp;
                            <br />
                          </Text>
                        </div><div className="col" style={{ textAlign: "center", "float": 'right' }}>
                          Account status:
                          <Text
                            color="#F5b00e"
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <b> &nbsp;{farmerStatus}</b>
                            <br />
                          </Text>
                        </div>
                      </div>
                    </div>
                    <br />

                    <Flex
                      sx={{
                        gap: "1.0rem",
                        margin: "1.0rem 0",
                        flexWrap: "wrap",
                        alignItems: "center",
                        alignSelf: "stretch",
                        justifyContent: "center",

                        "@media (min-width: 768px": {
                          flexDirection: "row",
                        },
                      }}
                    >
                      <Button
                        onClick={handleStakeButtonClick}
                        disabled={
                          !(farmerStatus === "unstaked" && farmerVaultNFTs?.length && farmerVaultNFTs.length >= minimumRequiredNFTs && (isFiveDifferent ? isFiveDiffAndEligible : true))
                        }
                      >
                        Stake
                      </Button>
                      <Button
                        onClick={handleUnstakeButtonClick}
                        disabled={
                          !(
                            farmerStatus === "staked" ||
                            farmerStatus === "pendingCooldown"
                          )
                        }
                      >
                        {farmerStatus === "pendingCooldown"
                          ? "End cooldown"
                          : "Unstake"}
                      </Button>
                      <Button
                        onClick={handleClaimButtonClick}
                        disabled={!Number(availableA)}
                      >
                        Claim{" "}
                        <img
                          sx={{
                            margin: "0 .4rem 0 .8rem",
                            maxHeight: "2.4rem",
                          }}
                          src="images/icon-list-item.png"
                        />
                        {availableA ? (
                          <b>{(availableA / 1000000).toFixed(2)}</b>
                        ) : (
                          0
                        )}
                      </Button>
                      <Button onClick={handleRefreshRewardsButtonClick}>
                        Refresh
                      </Button>
                    </Flex>
                    <Flex
                      sx={{
                        alignItems: "center",
                        gap: ".8rem",
                        margin: ".8rem 0",
                      }}
                    >
                      {feedbackStatus ? (
                        <>
                          <LoadingIcon size="1.6rem" />
                          {"  "} <Text variant="small">{feedbackStatus}</Text>
                        </>
                      ) : (
                        ""
                      )}
                      &nbsp;
                    </Flex>
                  </>
                ) : null}

                <Tabs
                  sx={{
                    margin: "1.2rem 0",
                    alignSelf: "stretch",
                    minHeight: "28rem",

                  }}
                >
                  <TabList>
                    <Tab style={{ "backgroundColor": "black" }}>Your wallet</Tab>
                    <Tab style={{ "backgroundColor": "black" }}>Your vault</Tab>
                  </TabList>

                  <TabPanel>

                    {
                      walletNFTs ? (

                        walletNFTs.length ? (
                          <Flex
                            sx={{
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              sx={{
                                display: "grid",
                                gridTemplateColumns:
                                  walletNFTs.length > 1 ? "1fr 1fr" : "1fr",
                                gap: "1.6rem",
                                alignItems: "center",

                                "@media (min-width: 768px)": {
                                  gridTemplateColumns:
                                    walletNFTs.length > 9
                                      ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                      : walletNFTs.length > 4
                                        ? "1fr 1fr 1fr 1fr 1fr"
                                        : walletNFTs.map(() => "1fr").join(" "),
                                },
                              }}
                            >
                              {walletNFTs.map((item) => {
                                const isSelected = selectedWalletItems.find(
                                  (NFT) =>
                                    NFT.onChain.metaData.mint ===
                                    item.onChain.metaData.mint
                                )

                                return (
                                  <CollectionItem
                                    key={item.onChain.metaData.mint}
                                    item={item}
                                    onClick={
                                      !isLocked ? handleWalletItemClick : () => true
                                    }
                                    sx={{
                                      maxWidth: "16rem",
                                      "> img": {
                                        border: "3px solid transparent",
                                        borderColor: isSelected
                                          ? "#F5b00e"
                                          : "transparent",
                                      },
                                    }}
                                  />
                                )
                              })}
                            </div>
                            {walletNFTs.length && !isLocked ? (
                              <Text
                                sx={{
                                  margin: "3.2rem 0 .8rem 0",
                                }}
                                variant="small"
                              >
                                Select NFTs to move them to your Vault.
                              </Text>
                            ) : null}
                            <Text>
                              {/* Selected:{" "}
                    {selectedWalletItems && selectedWalletItems.length
                      ? selectedWalletItems
                          .map((NFT) => NFT.onChain.metaData.data.name)
                          .join(", ")
                      : null} */}
                              {selectedWalletItems?.length && !isLocked ? (
                                <Button onClick={handleMoveToVaultButtonClick} >
                                  Deposit selected
                                </Button>
                              ) : null}
                            </Text>
                          </Flex>
                        ) : (

                          /** walletNFTs fetched but array is empty, means current wallet has no NFT. */
                          <Flex
                            sx={{
                              justifyContent: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <Text>There are no TBF NFTs on your wallet.</Text>
                          </Flex>
                        )
                      ) : /** No walletNFTs and public key, means it is loading */
                        publicKey ? (
                          <Flex
                            sx={{
                              justifyContent: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <Spinner variant="styles.spinnerLarge" />
                          </Flex>
                        ) : null}
                  </TabPanel>
                  <TabPanel>
                    {farmerVaultAccount ? (
                      <>
                        {/** Vault UI section */}
                        {/* <ThemeHeading
                  variant="heading3"
                  sx={{
                    marginTop: "3.2rem",
                    textAlign: "center"
                  }}
                >
                  Your Vault
                </ThemeHeading> */}

                        {farmerVaultNFTs ? (
                          farmerVaultNFTs.length ? (
                            <Flex
                              sx={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignSelf: "stretch",
                                alignItems: "center",
                              }}
                            >
                              <div
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    farmerVaultNFTs.length > 1 ? "1fr 1fr" : "1fr",
                                  gap: "1.6rem",

                                  "@media (min-width: 768px)": {
                                    gridTemplateColumns:
                                      farmerVaultNFTs.length > 9
                                        ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                        : farmerVaultNFTs.length > 4
                                          ? "1fr 1fr 1fr 1fr 1fr"
                                          : farmerVaultNFTs
                                            .map(() => "1fr")
                                            .join(" "),
                                  },
                                }}
                              >
                                {farmerVaultNFTs.map((item) => {
                                  const isSelected = selectedVaultItems.find(
                                    (NFT) =>
                                      NFT.onChain.metaData.mint ===
                                      item.onChain.metaData.mint
                                  )

                                  return (
                                    <CollectionItem
                                      key={item.onChain.metaData.mint}
                                      item={item}
                                      onClick={
                                        !isLocked
                                          ? handleVaultItemClick
                                          : () => true
                                      }
                                      sx={{
                                        maxWidth: "16rem",
                                        "> img": {
                                          border: "3px solid transparent",
                                          borderColor: isSelected
                                            ? "primary"
                                            : "transparent",
                                        },
                                      }}
                                    />
                                  )
                                })}
                              </div>
                              {farmerVaultNFTs.length && !isLocked ? (
                                <Text
                                  sx={{
                                    margin: "3.2rem 0 .8rem 0",
                                  }}
                                  variant="small"
                                >
                                  Select NFTs to withdraw them to your wallet.
                                </Text>
                              ) : null}

                              {selectedVaultItems && selectedVaultItems.length ? (
                                <>
                                  {/* Selected:{" "}
                          {selectedVaultItems
                            .map((NFT) => NFT.onChain.metaData.data.name)
                            .join(", ")} */}
                                  {!isLocked ? (
                                    <Button onClick={


                                      handleMoveToWalletButtonClick
                                    }>
                                      Withdraw selected
                                    </Button>
                                  ) : null}
                                </>
                              ) : null}
                            </Flex>
                          ) : (
                            /** vaultNFTs fetched but array is empty, means current wallet has no NFT. */
                            <Flex
                              sx={{
                                justifyContent: "center",
                                alignSelf: "stretch",
                              }}
                            >
                              <Text>There are no TBF NFTs on your vault.</Text>
                            </Flex>
                          )
                        ) : /** No vaultNFTs and public key, means it is loading */
                          publicKey ? (
                            <Flex
                              sx={{
                                justifyContent: "center",
                                alignSelf: "stretch",
                              }}
                            >
                              <Spinner variant="styles.spinnerLarge" />
                            </Flex>
                          ) : null}
                      </>
                    ) : null}
                  </TabPanel>
                </Tabs>
              </>
            )}
      </Flex>
    </Container>
  )
}

export default StakePage
