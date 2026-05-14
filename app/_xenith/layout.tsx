import type { Metadata } from 'next';
import React from 'react';

const DESCRIPTION = 'Xenith - Event at IIT Patna by STC Hybrid. Explore innovation, technology, and creativity with workshops, competitions, and guest lectures. Join us to experience the future of tech!  ';

export const metadata: Metadata = {
    title: {
        default: 'Xenith - STC IITP Hybrid',
        template: '%s | STC',
    },
    description: DESCRIPTION,
    keywords: ['xenith', 'stc', 'iit', 'iit patna', 'iitp', 'tech event', 'technology', 'innovation', 'workshops', 'competitions', 'guest lectures'],
    openGraph: {
        title: 'Xenith - STC IITP Hybrid',
        description: DESCRIPTION,
        siteName: 'STC',
        images: [
            {
                url: '/xenith/logo.png',
                width: 1200,
                height: 630,
                alt: 'Xenith',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: '/xenith/logo.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
        },
    },
};

export default function XenithLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}