const Filter = ( {filterText, updateFilter} ) => (
  <form>
    <div>
      filter shown with<input value={filterText} onChange={(event) => updateFilter(event.target.value)}/>
    </div>
  </form>
);

export default Filter;