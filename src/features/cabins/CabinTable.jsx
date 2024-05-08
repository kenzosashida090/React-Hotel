import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {isLoading, cabins} = useCabins()
  const [searchParams] = useSearchParams()
  if(isLoading) return <Spinner />
  const filterValue = searchParams.get("discount") || "all"; //if there is no params yet usually when we first enter to the cabins page, we set the default value as all

  let filteredCabins;
  
  switch(filterValue){
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin)=>cabin.discount === 0 )
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin)=>cabin.discount > 0 )
      break;
      default:
        throw new Error("There is no filter with that name")
  }
  
  return (
    <Menus>
      <Table columns = " 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capactity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={filteredCabins} render={ cabin=><CabinRow cabin={cabin} key={cabin.id}/>}/>
        {/**RENDER PROPS PATTERN */}
      </Table>
    </Menus>
  )
}

export default CabinTable
