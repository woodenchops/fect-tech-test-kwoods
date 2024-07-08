import { useSearchUser } from './hooks';

export const UserSearch = () => {
  const { handleClearSearch, handleSearchClick, handleQuery, error, query } =
    useSearchUser();

  return (
    <div>
      <h1>User Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleQuery}
        placeholder="Enter email or name"
        data-testid="search-input"
      />
      <button onClick={handleSearchClick} data-testid="search-button">
        Search
      </button>
      <button onClick={handleClearSearch}>Clear search</button>
      {error && <p>{error}</p>}
    </div>
  );
};
