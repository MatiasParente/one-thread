function Star({ fill, size }) {
    const id = `star-${Math.random().toString(36).slice(2, 9)}`;

    if (fill === 'full') {
        return (
            <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5" />
            </svg>
        );
    }

    if (fill === 'half') {
        const clipId = `${id}-half`;
        return (
            <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id={clipId}>
                        <rect x="0" y="0" width="10" height="20" />
                    </clipPath>
                </defs>
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" fill="#d1d5db" stroke="#d1d5db" strokeWidth="0.5" />
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5" clipPath={`url(#${clipId})`} />
            </svg>
        );
    }

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" fill="#d1d5db" stroke="#d1d5db" strokeWidth="0.5" />
        </svg>
    );
}

export default function StarRating({ value, size = 14 }) {
    const num = value !== null && value !== undefined ? Number(value) : null;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        let fill;
        if (num === null) {
            fill = 'empty';
        } else if (i + 1 <= num) {
            fill = 'full';
        } else if (i + 0.5 <= num) {
            fill = 'half';
        } else {
            fill = 'empty';
        }
        stars.push(<Star key={i} fill={fill} size={size} />);
    }

    return (
        <div className="flex items-center justify-center gap-0.5" aria-label={num !== null ? `${num.toFixed(1)} de 5 estrellas` : 'Sin puntuación'}>
            {stars}
        </div>
    );
}
