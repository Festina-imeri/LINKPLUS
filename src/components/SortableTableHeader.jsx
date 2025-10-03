export default function SortableTableHeader({ 
  children, 
  sortKey, 
  currentSortKey, 
  currentSortDir, 
  onSort 
}) {
  const isActive = currentSortKey === sortKey
  
  function handleClick() {
    if(isActive) {
      const newDir = currentSortDir === 'asc' ? 'desc' : 'asc'
      onSort(sortKey, newDir)
    } else{
      onSort(sortKey, 'asc')
    }
  }

  function getSortIcon() {
    if(!isActive) {
      return <span className="sortIcon inactive">↕</span>
    }
    return currentSortDir === 'asc' 
      ? <span className="sortIcon active">↑</span>
      : <span className="sortIcon active">↓</span>
  }

  return (
    <th 
      className={`sortableTh ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="thContent">
        <span>{children}</span>
        {getSortIcon()}
      </div>
    </th>
  )
}
