import { Component } from 'react';
import { toast } from 'react-toastify';
import ImagesApiService from '../../services/pixabay-api';
import CustomLoader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const imagesApiService = new ImagesApiService();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class SearchResults extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    showModal: false,
    largeImageURL: '',
    alt: '',
    loaderStatus: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      if (this.props.searchQuery.trim() === '') {
        return this.setState({ status: Status.IDLE });
      }

      this.setState({ images: [], status: Status.PENDING });

      imagesApiService.resetPage();
      imagesApiService.query = this.props.searchQuery;

      imagesApiService
        .fetchImages()
        .then(images => {
          if (images.total) {
            return this.setState(prevState => {
              return {
                images: [...prevState.images, ...images.hits],
                status: Status.RESOLVED,
              };
            });
          } else {
            return Promise.reject(new Error(`No match found!`));
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  loadMoreClick = () => {
    this.setState({ loaderStatus: true });

    imagesApiService.pageNum += 1;

    imagesApiService
      .fetchImages()
      .then(images => {
        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
          };
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        this.setState({ loaderStatus: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImageClick = event => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: event.target.dataset.src,
      alt: event.target.alt,
    }));
  };

  render() {
    const { images, error, status, loaderStatus } = this.state;

    if (status === 'idle') {
      return null;
    }

    if (status === 'pending' && !images.length) {
      return <CustomLoader />;
    }

    if (status === 'rejected') {
      toast.error(error.message);
      return null;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} onClick={this.handleImageClick} />
          {loaderStatus && <CustomLoader />}
          <Button onClick={this.loadMoreClick} />
          {this.state.showModal && (
            <Modal
              imgURL={this.state.largeImageURL}
              alt={this.state.alt}
              onClose={this.toggleModal}
            />
          )}
        </>
      );
    }
  }
}
