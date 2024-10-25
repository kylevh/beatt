import "./Home.scss";
import { GridItem } from "src/components/GridItem/GridItem";

const Home = () => {
    return (
        <>
            <GridItem colStart={1} colSpan={1} rowStart={1} rowSpan={1}>
                <h1>Home</h1>
            </GridItem>
        </>
    );
};

export default Home;