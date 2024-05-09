import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const {isLoading, cabins} = useCabins()
  const [searchParams] = useSearchParams()
  if(isLoading) return <Spinner />
  //1) FITLER
  const filterValue = searchParams.get("discount") || "all"; //if there is no params yet usually when we first enter to the cabins page, we set the default value as all
  if(!cabins.length) return <Empty resourceName="cabins" />
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
  // 2) SORTY
  const sortBy = searchParams.get("sortBy") || "name-asc"; 
  let [field, secondFiled, direction] = sortBy.split("-")
 
  let sortedCabins 

  if(direction){
    
    const modifier =  direction === "asc" ? -1 : 1
    sortedCabins = filteredCabins.sort((a,b)=> (a[`${field}_${secondFiled}`] - b[`${field}_${secondFiled}`])*modifier
  )

  } else if(!direction){
    const modifier =  secondFiled === "asc" ? 1 : -1
    sortedCabins = filteredCabins.sort((a,b)=>(a[field] - b[field])*modifier)
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
        <Table.Body data={sortedCabins} render={ cabin=><CabinRow cabin={cabin} key={cabin.id}/>}/>
        {/**RENDER PROPS PATTERN */}
      </Table>
    </Menus>
  )
}

export default CabinTable
