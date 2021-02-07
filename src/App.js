import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Container from "./components/Container/Container";
import Loader from "react-loader-spinner";
import Searchbar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import apiService from "./services/hits-api";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        const request = await apiService(query, page);
        if (request.length === 0) {
          return setError(`No results were found for ${query}!`);
        }
        setImages((prevImages) => [...prevImages, ...request]);
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const searchImages = (newSearch) => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = (e) => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy(0, window.innerHeight + 150);
    }, 1000);
  };

  return (
    <Container>
      <Searchbar onHandleSubmit={searchImages} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {isLoading && (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          style={{ textAlign: "center" }}
        />
      )}
      {!isLoading && images.length > 0 && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
}
