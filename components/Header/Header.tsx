/** @jsxImportSource theme-ui */
import Link from "next/link"
import { Button, Container, Flex, Input, Text } from "@theme-ui/components"

import WalletManager from "@/components/WalletManager/WalletManager"
import { Dispatch, SetStateAction, useState } from "react"
import { CloseIcon, MenuIcon } from "../icons"
import { Dropdown, DropdownButton, Form } from "react-bootstrap"
import Select from "react-dropdown-select"

type Props = {
  farmId?: string
  setFarmId?: Dispatch<SetStateAction<string>>
  stakedCount : number
}
const Header = ({ farmId, setFarmId ,stakedCount }: Props) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
  const [isChangingFarmId, setIsChangingFarmId] = useState(false)

  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9,
        background: (theme) => theme.colors?.backgroundGradient,
        borderTop: "4px solid",
        borderColor: "background2",
      }}
    >
      <Container>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            minWidth:"300px"
          }}
          p=".1rem"
        >
         
          
            <Flex as="a" sx={{ alignItems: "center", flexDirection: "column" }}>
            <div className="container">
        <div className="row">
          <div className="col">
            <Flex
              sx={{
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                float: 'left',
                minWidth:"300px",
                margin:"5px"
              }}
            >
              
              Staked % :

              <Text color="#F5b00e" sx={{
                textAlign: "center",
              }}>

               <b> &nbsp;{ Number((stakedCount/1333)*100).toFixed(1)+"%" }</b>
              </Text>

            </Flex>

          </div>
          
          <div className="col" style={{  minWidth:"300px", float: 'right' }}>
          <Flex
              sx={{
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                float: 'left',
                minWidth:"300px",
                margin:"5px"
              }}
            >
            Total staked :
            <Text
              color="#F5b00e"
              sx={{
                textAlign: "center",
              }}
            >
              <b> &nbsp;{stakedCount}</b>
              
            </Text>
            </Flex>
          </div>
        </div>
      </div>

            </Flex>
         


          <Flex
            as="nav"
            sx={{
              gap: "1.6rem",
              display: "none",
              alignItems: "center",

              /** Mobile styles when the menu is active */
              ...(isMobileMenuActive && {
                display: "flex",
                position: "fixed",
                flexDirection: "column",
                alignItems: "center",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                padding: "1.6rem",
                transition:
                  "opacity 0.125s cubic-bezier(0.175, 0.885, 0.32, 1.275),visibility 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                backgroundColor: "background",
                zIndex: 99,

                "& > a": {
                  marginBottom: ".8rem",
                },

                "&.active": {
                  visibility: "visible",
                  opacity: 1,
                },
              }),

              /** Desktop styles (reset mobile) */
              "@media (min-width: 768px)": {
                display: "flex",
                flexDirection: "row",
                width: "auto",
                height: "auto",
                padding: 0,
                position: "relative",
              },
            }}
          >
            <Button
              sx={{
                alignSelf: "flex-end",
                padding: ".8rem",

                ...(!isMobileMenuActive && { display: "none" }),
              }}
              onClick={() => setIsMobileMenuActive(false)}
            >
              <CloseIcon />
            </Button>
            {false && (
              <Input
                sx={{
                  fontSize: "1.1rem",
                  padding: ".4rem",
                  border: "none",
                  borderBottom: "1px solid",
                  borderRadius: 0,
                  width: "auto",
                }}
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
              />
            )}

            { <a
              tabIndex={0}
              sx={{
                margin: "0 auto",
                fontSize: "1.5rem",
                whiteSpace: "nowrap",
                textDecoration: "none"
              }}
              onClick={() => setIsChangingFarmId((prev) => !prev)}
            >
              Choose Farm :
            </a> }
            {<Form.Select  style={{
              margin:"5px"
            }} aria-label="Farm" id="this" size="lg" onChange={(value) => {
              var e = document.getElementById("this") as HTMLInputElement ;
              var strUser = e.value;
              setFarmId(strUser)
            }}>
              <option value="35oWr3gCUjtnYi5XsAxKygsEZVUYgXMUSMe5AeMhFzia">Normal Staking</option>
              <option value="GY8Zqr53z7WXTEtNqp3bJhQCndhvvSCgxTLGvjzy5vcm">TBF FullHouse Staking</option>
              <option value="BkxHZkiK4bJ8o7yShwXbP6tYGeqLoL864PCt6EafV5FE">20 NFTs Staking</option>
              <option value="9z9F6Nz42gt46tLf6cYJutjcBvRf9ExLMonTKbpfnbzw">15 NFTs Staking</option>
              <option value="BU2zhNVDTfDDfj7vrT7pJxnVWCNTXGFUoig38yQhTU78">10 NFTs Staking</option>
              <option value="5oz9ztE35mz6bgyczdG4zSsTteA3wMdax9xPHQvjMMBK">5 NFTs Staking</option>
            </Form.Select> }
            <WalletManager />
          </Flex>
          <Button
            sx={{
              padding: ".8rem",
              "@media(min-width: 768px)": {
                display: "none",
              },
            }}
            onClick={() => setIsMobileMenuActive(true)}
          >
            <MenuIcon />
          </Button>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Header
