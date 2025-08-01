// src/app/dashboard/components/icons/ExternalLinkIcon.tsx

import React from 'react';

const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3h4a2 2 0 012 2v4m-6-6l6 6-6 6m-6 3H5a2 2 0 01-2-2v-4m6 6l-6-6 6-6"
            />
        </svg>
    );
};

export default ExternalLinkIcon;