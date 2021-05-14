import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPagechange: PropTypes.func,
};

Pagination.defautProps = {
    onPagechange: null,
}


function Pagination(props) {
    const { pagination, onPagechange } = props;
    const { _page, _limit, _totalRows } = pagination;

    const totalPages = Math.ceil(_totalRows / _limit);
    function handlePagechange(newPage) {
        if (onPagechange) {
            onPagechange(newPage);
        }
    }
    return (
        <div>
            <button
                disabled={_page === 1}
                onClick={() => handlePagechange - 1}
            >
                prev
            </button>

            <button
                disabled={_page === totalPages}
                onClick={() => handlePagechange + 1}
            >
                next
            </button>
        </div>
    );
}

export default Pagination;