const Searchbar = ({ onSubmit, onChange }) => {
    return (
        <header className="Searchbar">
            <form className="SearchForm" type="">
                <button className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                />
            </form>
        </header>
    );
};

export default Searchbar;
