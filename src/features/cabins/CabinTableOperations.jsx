
import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import Sort from "../../ui/Sort"
function CabinTableOperations() {
    return (
      <TableOperations>
        <Filter filterField={"discount"} options={[
            {value:"all", label:"All"}, 
            {value:"no-discount", label:"No discount"}, 
            {value:"with-discount", label:"With Discount"}
            ]}
            />    
        <Sort options={[
            {value:"name-asc", label:"Sort by name (A-Z)"},
            {value:"name-desc", label:"Sort by name (Z-A)"},
            {value:"regular-price-desc", label:"Sort by price (low first)"},
            {value:"regular-price-asc", label:"Sort by price (hight frist)"},
            {value:"max-capacity-desc", label:"Sort by capacity (low frist)"},
            {value:"max-capacity-asc", label:"Sort by capacity (hight frist)"},
        ]}/>
      </TableOperations>
    )
}

export default CabinTableOperations
