import { Helmet } from 'react-helmet-async';

export default function SEO({ title = '', description = '', name = '', type = 'website' }) {
    const siteName = 'Kodex Agency';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            {/* End standard metadata tags */}

            {/* Facebook tags */}
            <meta property='og:type' content={type || 'website'} />
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={description} />
            <meta property='og:site_name' content={siteName} />
            <meta property='og:image' content="https://raw.githubusercontent.com/yony-chaparro/kodex_agency/main/public/og-image.jpg" />
            {/* End Facebook tags */}

            {/* Twitter tags */}
            <meta name='twitter:creator' content={name || siteName} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content="https://raw.githubusercontent.com/yony-chaparro/kodex_agency/main/public/og-image.jpg" />
            {/* End Twitter tags */}
        </Helmet>
    );
}
