import React, { useState, useEffect } from 'react';
import useDebounce from './services/debounce';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';

import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
// import Button from './components/Button';
import Modal from './components/Modal';

function App() {
    const [searchQuery, setQuery] = useState(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleInputChange = e => {
        setQuery(e.target.value);
    };

    const [status, setStatus] = useState('');
    const [hits, setHits] = useState([]);

    const fetchImg = query => {
        fetchingImages(query)
            .then(res => {
                setHits(prevState =>
                    !prevState ? [...res.hits] : [...prevState, ...res.hits],
                );
                setStatus('resolved');
            })
            .then(setStatus('pending'))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (!debouncedSearchQuery) return;
        fetchOptions.PAGE = 1;
        if (debouncedSearchQuery) {
            setHits([]);
            fetchImg(debouncedSearchQuery);
            window.scrollTo({
                top: document,
                behavior: 'smooth',
            });
        }
    }, [debouncedSearchQuery]);

    const onLoadMore = () => {
        fetchOptions.PAGE += 1;
        fetchImg(debouncedSearchQuery);
    };

    const [modal, setModalShown] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalAlt, setModalAlt] = useState('');

    const onImageClick = e => {
        if (!e.target.classList.contains('ImageGalleryItem-image')) return;
        setModalImage(e.target.dataset.modal);
        setModalAlt(e.target.alt);
        setModalShown(true);
        window.addEventListener('keydown', handleKeydown);
    };

    const handleBackdropClick = e => {
        if (e.target.classList.contains('Overlay')) resetModal();
        return;
    };

    const handleKeydown = e => {
        if (e.code === 'Escape') resetModal();
        window.removeEventListener('keydown', handleKeydown);
    };

    const resetModal = () => {
        setModalImage('');
        setModalAlt('');
        setModalShown(false);
    };

    return (
        <>
            <Searchbar onChange={handleInputChange} />

            <InfiniteScroll
                dataLength={hits.length}
                next={onLoadMore}
                hasMore={true}
                loader={
                    status === 'pending' && (
                        <Loader
                            className="spinner"
                            type="TailSpin"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    )
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <ImageGallery onImageClick={onImageClick} hits={[...hits]} />
            </InfiniteScroll>
            {modal && (
                <Modal
                    modalAlt={modalAlt}
                    modalImage={modalImage}
                    onClose={handleKeydown}
                    handleBackdropClick={handleBackdropClick}
                />
            )}
        </>
    );
}

export default App;
