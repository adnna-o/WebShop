import { FC } from "react"
import "./HomePage.css"
import TopNavBar from "../Components/TopNavBar/TopNavBar"

export const HomePage: FC=()=>{

    return <>
    <TopNavBar/>
    <div className="main-div">
        <h1>Naslov</h1>

    </div>
    <footer>

    </footer>
    </>
}