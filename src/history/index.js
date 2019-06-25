import qs from 'qs';
import { createBrowserHistory } from 'history';

function addQuery(history) {
  const location = history.location;
  history.location = {
    ...location,
    query: qs.parse(location.search, { ignoreQueryPrefix: true })
  };
}

const history = createBrowserHistory();

addQuery(history);

export const unlisten = history.listen(() => {
  addQuery(history);
});

export default history;
