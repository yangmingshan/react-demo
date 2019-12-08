import qs from 'qs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

function addQuery(history) {
  const { location } = history;
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
