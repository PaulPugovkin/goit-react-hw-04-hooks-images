import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ hits, onImageClick }) => {
    return (
        <ul className="ImageGallery">
            {hits.map(hit => (
                <ImageGalleryItem
                    largeImage={hit.largeImageURL}
                    key={hit.id}
                    src={hit.webformatURL}
                    alt={hit.tags}
                    onImageClick={onImageClick}
                />
            ))}
        </ul>
    );
};
ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    onImageClick: PropTypes.func.isRequired,
};
export default ImageGallery;
