import AccountIcon from "@/icon/AccountIcon"
import DigitalTNRIcon from "@/icon/DigitalTNRIcon"
import DocumentIcon from "@/icon/DocumentIcon"
import HelpIcon from "@/icon/HelpIcon"
import SettingsIcon from "@/icon/SettingsIcon"
import SoundIcon from "@/icon/SoundIcon"
import styled from "styled-components"

const SidebarContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 50px;
  background-color: #2940c3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Logo = styled.div`
  width: 100%;
  aspect-ratio: 1;
  /* opacity: 0.6; */
`

const Divider = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #00000045;
`

const ServicesMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 0;
`

const ServiceButton = styled.button<{atual?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: #2940c3;

  transition: 0.6s;

  border-radius: 0 10px 10px 0;
  
  ${props => props.atual && `
    background-color: #4c5fce;
    width: calc(100% + 10px) !important;
    padding-left: 10px !important; 
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2) !important;
  `}

  &:hover {
    transition: 0.2s;
    width: calc(100% + 5px);
    padding-left: 5px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.4);
  }
`

const CircularButton = styled.button`
  /* background-color: #4c5fce; */
  border-radius: 100%;
  padding: 5px;

  transition: 0.2s;

  &:hover {
    background-color: #4c5fce;
  }
`

const ConfigurationContainer = styled.div`
  padding: 14px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
`

export default function SideBar() {
  return (
    <SidebarContainer>
      <div>
        <Logo className="center"><DigitalTNRIcon/></Logo>
        <Divider />
        <ServicesMenu>
          <ServiceButton atual={true}> <DocumentIcon/> </ServiceButton>
          <ServiceButton> <SoundIcon/> </ServiceButton>
        </ServicesMenu>
      </div>
      <ConfigurationContainer>

        <CircularButton>
          <HelpIcon />
        </CircularButton>

        <CircularButton>
          <SettingsIcon/>
        </CircularButton>

        <CircularButton>
          <AccountIcon />
        </CircularButton>
        
        
      </ConfigurationContainer>
    </SidebarContainer>
  )
}
