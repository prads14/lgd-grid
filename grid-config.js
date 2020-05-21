var columnDefs = [
    {headerName: "Name", field: "name", filter: 'agTextColumnFilter', sortable: true, checkboxSelection: true},
    {headerName: "Username", field: "username"},
    {headerName: "Email", field: "email"},
    {headerName: "Phone", field: "phone", filter: 'agTextColumnFilter'},
    {headerName: "Website", field: 'website'}
  ];

  // specify the data
//   var rowData = [
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000},
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000},
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000},
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000},
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000}
//   ];

  // let the grid know which columns and what data to use
  var gridOptions = {
    columnDefs: columnDefs,
    rowSelection: 'multiple',
    defaultColDef: {
      floatingFilter: true
    },
    //rowData: rowData,
    onGridReady: function(params) {
        params.api.sizeColumnsToFit();
    },
    pagination: true,
    paginationPageSize: 5,
    animateRows: true,
    isExternalFilterPresent: isExternalFilterPresent,
    doesExternalFilterPass: doesExternalFilterPass,
  };

  var filerValue = 'everyone';

  function isExternalFilterPresent() {
    // if ageType is not everyone, then we are filtering
    return filerValue != 'everyone';
  }

  function doesExternalFilterPass(node) {
  
    if(filerValue != '') {
      filerValue = filerValue.toLowerCase();
      str = node.data.username.toLowerCase();
      return str.includes(filerValue);

    } else {
      return true;
    }
  }

  function externalFilterChanged(e) {

    filerValue = e.value;
    gridOptions.api.onFilterChanged();
  }
  

  const onFilterTextBoxChanged = () => {
    gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
  }

  //Get row data for further processing

  function getRowData() {
    var rowData = [];
    gridOptions.api.forEachNode(function(node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  }

  function clearFilter() {
    // Custom filtering to achieve external filter results.
    customFilter = document.getElementById('filter-username');
    customFilter.value = '';
    filerValue = 'everyone';
    document.getElementById('filter-text-box').value = '';
    onFilterTextBoxChanged();
    gridOptions.api.setFilterModel(null);
    gridOptions.api.onFilterChanged(); 
  }

  function setUsername() {
    gridOptions.api.setFilterModel({
      username: {
        type: 'set',
        values: ['Bret'],
      },
    });
    gridOptions.api.onFilterChanged();  
  }

// create the grid passing in the div to use together with the columns & data we want to use

window.onload = async() => {
    var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);
    agGrid.simpleHttpRequest({url: 'https://jsonplaceholder.typicode.com/users'})
    .then(function(data) {
        console.log(data.result)
        gridOptions.api.setRowData(data)
    })

}
