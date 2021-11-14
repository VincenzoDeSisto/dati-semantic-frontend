import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AssetTypeFilter from "../AssetTypeFilter/AssetTypeFilter";
import { search } from "../../../services/searchService";
import SearchResults from "../SearchResults/SearchResults";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const showAssetTypeFilter = (type) => {
  if (!type) {
    return null;
  }

  return <AssetTypeFilter types={[type]} />;
};

const showItems = (isLoading, items) => {
  if (isLoading) {
    return <h2>Caricamento...</h2>;
  }

  return <SearchResults items={items} />;
};

const SearchPage = () => {
  const [items, setItems] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let query = useQuery();
  useEffect(() => {
    const doSearch = async () => {
      setLoading(true);
      const results = await search({ pattern: query.get("pattern") });
      setItems(results);
      setLoading(false);
    };
    doSearch();
  }, []);

  return (
    <div data-testid="SearchPage">
      <div className="container main-container pl-4 pr-4">
        <div className="row">
          <div className="col-12 col-lg-4 col-md-4 primary-bg-a2" role="search">
            <div id="cv-facet-pane">
              <div className="row d-flex justify-content-center p-3">
                <div className="col">
                  <h4>Ricerca</h4>
                  {showAssetTypeFilter(query.get("type"))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 col-md-8">
            {showItems(isLoading, items)}
          </div>
        </div>
      </div>
    </div>
  );
};

SearchPage.propTypes = {};

SearchPage.defaultProps = {};

export default SearchPage;