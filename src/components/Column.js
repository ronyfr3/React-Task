export const COLUMNS = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Availability',
      accessor: (row) => row.availability===true?"true":"false",
    },
    {
      Header: 'Need To Repair',
      accessor: (row) => row.needing_repair===true?"true":"false",
    },
    {
        Header: 'Durability',
        accessor: 'durability',
      },
    {
      Header: 'Mileage',
      accessor:(row)=>row.mileage===null?"null":row.mileage,
    },
  ];