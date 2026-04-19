import type { Metadata } from 'next';
import React from 'react';
import AppConfig from "@/config/appConfig";

const DESCRIPTION = 'Phoenix - Event at IIT Patna by STC Hybrid. Explore innovation, technology, and creativity with workshops, competitions, and guest lectures. Join us to experience the future of tech!  ';

export const metadata: Metadata = {
    title: {
        default: 'Phoenix - STC IITP Hybrid',
        template: '%s | STC',
    },
    description: DESCRIPTION,
    keywords: ['phoenix', 'stc', 'iit', 'iit patna', 'iitp', 'tech event', 'technology', 'innovation', 'workshops', 'competitions', 'guest lectures'],
    openGraph: {
        title: 'Phoenix - STC IITP Hybrid',
        description: DESCRIPTION,
        siteName: 'STC',
        images: [
            {
                url: AppConfig.imageUrls.phoenix.logo,
                width: 1200,
                height: 630,
                alt: 'Phoenix',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: AppConfig.imageUrls.phoenix.logo,
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

export default function PhoenixLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}