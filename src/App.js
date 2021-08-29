import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
    const [searchQuery, setQuery] = useState('');

    const handleInputChange = e => {
        setQuery(e.target.value);
    };

    const [status, setStatus] = useState('');
    const [hits, setHits] = useState(null);

    useEffect(() => {
        if (!searchQuery) return;
        fetchingImages(searchQuery)
            .then(res => {
                setHits(res.hits);
                setStatus('resolved');
            })
            .then(setStatus('pending'))
            .catch(err => {
                setStatus('rejected');
                console.log(err);
            });
    }, [searchQuery]);

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     fetchOptions.PAGE = 1;
    //     fetchingImages(searchQuery)
    //         .then(res => {
    //             setHits(res.hits);
    //             setStatus('resolved');
    //         })
    //         .then(setStatus('pending'))
    //         .catch(err => {
    //             setStatus('rejected');
    //             console.log(err);
    //         });
    // };

    const onLoadMore = () => {
        fetchOptions.PAGE += 1;
        fetchingImages(searchQuery)
            .then(res => {
                setHits(prevState => [...prevState, ...res.hits]);
                setStatus('resolved');
            })
            .then(setStatus('pending'))
            .catch(error => console.log(error))
            .finally(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            });
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
            <Searchbar
                // onSubmit={handleSubmit}
                onChange={handleInputChange}
            />
            {hits && hits.length > 0 && (
                <>
                    <ImageGallery
                        onImageClick={onImageClick}
                        hits={[...hits]}
                    />
                    <Button onLoadMore={onLoadMore} />
                </>
            )}
            {modal && (
                <Modal
                    modalAlt={modalAlt}
                    modalImage={modalImage}
                    onClose={handleKeydown}
                    handleBackdropClick={handleBackdropClick}
                />
            )}
            {status === 'pending' && (
                <Loader
                    className="spinner"
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            )}
        </>
    );
}

export default App;
