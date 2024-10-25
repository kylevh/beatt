import { GridItem } from "components/GridItem/GridItem";

const TaxPro = () => {
    return (
        <>
            <GridItem colStart={1} colSpan={2} rowStart={1} rowSpan={1}>
                <h1>TaxPro</h1>
            </GridItem>
            <GridItem colStart={3} colSpan={2} rowStart={1} rowSpan={2} >
                <h1>TaxPro</h1>
            </GridItem>
            <GridItem colStart={1} colSpan={2} rowStart={2} rowSpan={1}>
                <h1>TaxPro</h1>
            </GridItem>
            <GridItem colStart={1} colSpan={1} rowStart={3} rowSpan={1}>
                <h1>TaxPro</h1>
            </GridItem>
            <GridItem colStart={2} colSpan={2} rowStart={3} rowSpan={1} >
                <h1>TaxPro</h1>
            </GridItem>
        </>
    )
}

export default TaxPro;