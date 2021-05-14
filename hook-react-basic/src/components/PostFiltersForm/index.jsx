import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersFrom.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersFrom.defauProps = {
    onSubmit: null,
};

function PostFiltersFrom(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        if (!onSubmit) return;
        typingTimeoutRef.current = setTimeout(() => {
            const formVa = { searchTerm: e.target.value };
            onSubmit(formVa);
        }, 300);
    }

    return (
        <form>
            <input type="text"
                value={searchTerm}
                onChange={handleSearchTermChange} />
        </form>
    );
}

export default PostFiltersFrom;