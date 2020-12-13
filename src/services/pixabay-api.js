const API_KEY = '19016514-f636b8f63ee9a8d1bcb803743';
const BASE_URL = 'https://pixabay.com/api/';
// const CORS = 'https://cors-anywhere.herokuapp.com/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?q=${this.searchQuery}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newNum) {
    this.page = newNum;
  }
}
