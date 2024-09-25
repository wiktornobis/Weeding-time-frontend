import { Helmet } from 'react-helmet-async';

type Props = {
    title: string,
    description: string,
    keywords: string,
    robots: string,
    canonicalLink?: string
};

const Head = ({title, description, keywords, robots, canonicalLink}: Props) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />
            {canonicalLink && (
                <link rel="canonical" href={canonicalLink} />
            )}
        </Helmet>
    );
};

export default Head;