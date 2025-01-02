import React from 'react';

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Date(dateString).toLocaleString('tr-TR', options);
};

function DateDisplay({ createdAt, updatedAt }) {
    return (
        <div>
            <p><strong>Oluşturulma Tarihi:</strong> {formatDate(createdAt)}</p>
            <p><strong>Güncellenme Tarihi:</strong> {formatDate(updatedAt)}</p>
        </div>
    );
}

export default DateDisplay;
