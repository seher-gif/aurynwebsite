import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

interface LinkProps extends NextLinkProps {
    children: ReactNode;
    className?: string;
    target?: string;
}

export function Link({ children, className, ...props }: LinkProps) {
    return (
        <NextLink className={className} {...props}>
            {children}
        </NextLink>
    );
}
