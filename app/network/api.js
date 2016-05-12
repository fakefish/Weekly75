const API_ADDRESS = 'http://weeklyapi.75team.com';

function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  return fetch(this.url, Object.assign({}, this.options))
          .then((response) => response.json());
}
export default {
  getNewest() {
    return fetchAction(`${API_ADDRESS}/issue/latest`);
  },
  getDetail(iid) {
    return fetchAction(`${API_ADDRESS}/issue/detail/${iid}`);
  },
  getList(page) {
    return fetchAction(`${API_ADDRESS}/issue/list/${page}`);
  },
  getSearch(keywords, page) {
    return fetchAction(`${API_ADDRESS}/article/search/${encodeURIComponent(keywords)}/${page}`);
  },
  postAdd(data) {
    return fetchAction(`http://www.75team.com/weekly/admin/article.php?action=add`, {
      method: 'post',
      body: data,
    });
  },
  getTitle(url) {
    return fetchAction(`${API_ADDRESS}/title/${encodeURIComponent(url)}`);
  }
}