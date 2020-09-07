import React from 'react';

import { Container } from './styles';

interface TooltipProps {
    className?: string;
    title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, title, children }) => {
    return (
        <Container className={className}>
            <span>{title}</span>
            {children}
        </Container>
    );
}

export default Tooltip;