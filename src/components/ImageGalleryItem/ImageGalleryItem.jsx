import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, id, largeImage, onImageClick }) => {
    return (
        <>
            <li className="ImageGalleryItem" key={id}>
                <img
                    src={src}
                    data-modal={largeImage}
                    alt={alt}
                    width="300"
                    height="300"
                    className="ImageGalleryItem-image"
                    onClick={onImageClick}
                />
            </li>
        </>
    );
};
ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
