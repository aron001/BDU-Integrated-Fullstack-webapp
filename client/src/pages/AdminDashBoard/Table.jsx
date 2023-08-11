import { useState, useMemo, useRef } from 'react';

function Table({ data }) {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    let filtered = data?.filter(item => item.username.toLowerCase().includes(filter.toLowerCase()));
    return filtered;
  }, [data, filter]);

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);
   
  function handleStatusUpdate(item){
    console.log(item.username)
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage => currentPage - 1);
  }

  function handleNextPage() {
    setCurrentPage(currentPage => currentPage + 1);
  }

  function handleRowsPerPageChange(e) {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="filters">
        <input type="text" placeholder="Filter by username" value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Lives In</th>
            <th>Works At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map(item => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.livesIn}</td>
              <td>{item.worksAt}</td>
              <td>
                <select onChange={()=>handleStatusUpdate(item)}>
                  <option value="true">Active</option>
                  <option value="false">Suspended</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="5">5 Rows</option>
          <option value="10">10 Rows</option>
          <option value="20">20 Rows</option>
        </select>
      </div>
    </div>
  );
}

export default Table;