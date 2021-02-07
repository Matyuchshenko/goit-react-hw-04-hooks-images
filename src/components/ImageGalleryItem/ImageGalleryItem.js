import PropTypes from "prop-types";
import "./ImageGalleryItem.css";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className="ImageGalleryItem_image"
        onClick={onOpenModal}
      />
    </li>
  );
}

ImageGalleryItem.defaultProps = {
  src: "https://dummyimage.com/640x480/2a2a2a/ffffff&text=Photo%20not%20found",
  alt: "",
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
