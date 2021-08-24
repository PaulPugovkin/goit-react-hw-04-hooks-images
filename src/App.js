import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
    // state = {
    //     status: '',
    //     searchQuery: '',
    //     hits: null,
    //     modal: false,
    //     modalImage: '',
    //     modalAlt: '',
    // };

    const [searchQuery, setQuery] = useState('');

    const handleInputChange = e => {
        setQuery({ searchQuery: e.target.value });
    };

    const [status, setStatus] = useState('');
    const [hits, setHits] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();

        fetchOptions.PAGE = 1;
        fetchingImages(searchQuery)
            .then(res => {
                setHits({ hits: res.hits });
                setStatus({ status: 'resolved' });
            })
            .then(setStatus({ status: 'pending' }))
            .catch(err => {
                setStatus({ status: 'rejected' });
                console.log(err);
            });
        console.log(status);
    };

    // const onLoadMore = () => {
    //     fetchOptions.PAGE += 1;
    //     fetchingImages(this.state.searchQuery)
    //         .then(res =>
    //             this.setState(prevState => ({
    //                 hits: [...prevState.hits, ...res.hits],
    //                 status: 'resolved',
    //             })),
    //         )
    //         .then(this.setState({ status: 'pending' }))
    //         .catch(error => console.log(error))
    //         .finally(() => {
    //             window.scrollTo({
    //                 top: document.documentElement.scrollHeight,
    //                 behavior: 'smooth',
    //             });
    //         });
    // };

    // const onImageClick = e => {
    //     console.log(e.target.alt);
    //     if (!e.target.classList.contains('ImageGalleryItem-image')) return;
    //     this.setState({
    //         modalImage: e.target.dataset.modal,
    //         modal: true,
    //         modalAlt: e.target.alt,
    //     });
    //     window.addEventListener('keydown', this.handleKeydown);
    // };

    // const handleBackdropClick = e => {
    //     if (e.target.classList.contains('Overlay')) this.resetModal();
    //     return;
    // };

    // const handleKeydown = e => {
    //     if (e.code === 'Escape') this.resetModal();
    // };

    // const resetModal = () => {
    //     this.setState({ modalImage: '', modal: false, modalAlt: '' });
    // };
    return (
        <>
            <Searchbar onSubmit={handleSubmit} onChange={handleInputChange} />
            {/* {hits && hits.length > 0 && (
                    <>
                        <ImageGallery onImageClick={onImageClick} hits={hits} />
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
                )} */}
        </>
    );
}

export default App;
