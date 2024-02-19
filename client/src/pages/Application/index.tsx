import SideBar from "@/components/SideBar"
import styled from "styled-components"
import WordTransform from "../WordTransform"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
`

const AppContainer = styled.section`
  padding-left: 50px;
`

export default function Application() {
  return (
    <Container>
      <SideBar />
      <AppContainer>
        <WordTransform />
      </AppContainer>
    </Container>
  )
}
